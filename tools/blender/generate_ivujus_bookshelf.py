"""Escenario IVUJUS. Ejecutar con Blender --background --factory-startup --python este_archivo.

Unidades en metros; glTF: X horizontal, Y vertical, Z hacia el visitante.
La escena previa nunca se borra cuando se ejecuta desde el editor de Blender.
"""
import argparse
import math
from pathlib import Path
import random
import sys

import bpy
import numpy as np
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[2]
parser = argparse.ArgumentParser()
parser.add_argument('--preview', action='store_true')
args = parser.parse_args(sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else [])
scene = bpy.data.scenes.new('IVUJUS_Biblioteca')
bpy.context.window.scene = scene
scene.unit_settings.system = 'METRIC'
scene.unit_settings.scale_length = 1
export_collection = bpy.data.collections.new('IVU_Export')
studio_collection = bpy.data.collections.new('IVU_Studio_NoExport')
preview_collection = bpy.data.collections.new('IVU_Placeholders_NoExport')
for collection in [export_collection, studio_collection, preview_collection]:
    scene.collection.children.link(collection)


def material(name, color, roughness=.5, metallic=0):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get('Principled BSDF')
    bsdf.inputs['Base Color'].default_value = (*color, 1)
    bsdf.inputs['Roughness'].default_value = roughness
    bsdf.inputs['Metallic'].default_value = metallic
    return mat


wood = material('IVU_Nogal_encerado', (.16, .073, .034), .42)
# Una textura UV pequeña y empaquetada conserva la veta al exportar a glTF.
rng = np.random.default_rng(1789)
size = 512
xx, yy = np.meshgrid(np.linspace(0, 1, size), np.linspace(0, 1, size))
grain = np.sin((xx * 91 + .7 * np.sin(yy * 8) + .22 * np.sin(xx * 21)) * math.pi)
grain += .35 * np.sin(xx * 380 + yy * 2) + rng.normal(0, .10, (size, size))
tone = np.clip(.52 + grain * .065, .22, .8)
pixels = np.ones((size, size, 4), dtype=np.float32)
pixels[:, :, :3] = tone[:, :, None] * np.array([.72, .43, .255])
tex = bpy.data.images.new('IVU_Nogal_512', width=size, height=size)
tex.pixels.foreach_set(pixels.ravel())
tex.pack()
node = wood.node_tree.nodes.new('ShaderNodeTexImage')
node.image = tex
wood.node_tree.links.new(node.outputs['Color'], wood.node_tree.nodes['Principled BSDF'].inputs['Base Color'])
back = material('IVU_Fondo_nogal', (.082, .041, .027), .78)
brass = material('IVU_Laton_cepillado', (.48, .32, .14), .32, .72)
lettering = material('IVU_Inscripcion_oscura', (.012, .008, .004), .9)
wall = material('IVU_Revoque_calido', (.38, .34, .29), .94)
paper = material('IVU_Papel_preview', (.65, .59, .45), .9)
cloth = [material('IVU_Preview_tela_' + str(i), color, .78) for i, color in enumerate([
    (.025, .071, .12), (.06, .115, .13), (.21, .083, .053), (.19, .16, .11),
    (.37, .29, .18), (.09, .105, .078), (.13, .11, .095)])]


def move_to(obj, collection):
    for previous in list(obj.users_collection):
        previous.objects.unlink(obj)
    collection.objects.link(obj)


def box(name, location, dimensions, mat, bevel=.005, collection=export_collection):
    # Coordenadas de diseño Y-up → Blender Z-up; el exportador invierte la conversión.
    x, y, z = location
    dx, dy, dz = dimensions
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, -z, y))
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = (dx, dz, dy)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    move_to(obj, collection)
    if bevel:
        modifier = obj.modifiers.new('Cantos_suaves', 'BEVEL')
        modifier.width = bevel
        modifier.segments = 2
        bpy.ops.object.modifier_apply(modifier=modifier.name)
        for polygon in obj.data.polygons:
            polygon.use_smooth = True
        modifier = obj.modifiers.new('Normales_ponderadas', 'WEIGHTED_NORMAL')
        bpy.ops.object.modifier_apply(modifier=modifier.name)
    return obj


box('IVU_Pared', (0, 1.6, -.40), (7.6, 4, .10), wall, .0)
box('IVU_Suelo', (0, -.025, .2), (7.6, .045, 5), wood, .003)
box('IVU_Fondo', (0, 1.48, -.185), (1.99, 2.60, .075), back)
for x in [-1.04, 1.04]:
    box('IVU_Montante_' + str(x), (x, 1.48, .07), (.16, 2.72, .55), wood, .012)
    box('IVU_Filete_' + str(x), (x, 1.48, .353), (.017, 2.59, .008), brass, .002)
for row in range(6):
    top = .30 + row * .48
    box('IVU_Balda_' + str(row), (0, top - .032, .065), (2.00, .064, .52), wood, .008)
    box('IVU_Canto_' + str(row), (0, top - .022, .333), (2.01, .018, .018), brass, .002)
    if row < 5:
        for x in [-.49, .49]:
            box('IVU_Panel_' + str(row) + '_' + str(x), (x, top + .21, -.135),
                (.94, .385, .02), wood, .005)
box('IVU_Zocalo', (0, .13, .075), (2.24, .20, .61), wood, .014)
box('IVU_Cornisa', (0, 2.935, .065), (2.24, .45, .63), wood, .012)
box('IVU_Cornisa_superior', (0, 3.19, .06), (2.31, .06, .69), wood, .01)
box('IVU_Placa', (0, 2.935, .394), (2.04, .37, .014), brass, .007)
bpy.ops.object.text_add(location=(0, -.405, 2.935), rotation=(math.pi / 2, 0, 0))
sign = bpy.context.object
sign.name = 'IVU_Nombre_institucional'
sign.data.body = 'Instituto de Victimología\nde Usina de Justicia'
sign.data.align_x = 'CENTER'
sign.data.align_y = 'CENTER'
sign.data.size = .13
sign.data.space_line = 1.0
sign.data.extrude = .0007
sign.data.resolution_u = 6
sign.data.materials.append(lettering)
move_to(sign, export_collection)
bpy.ops.object.convert(target='MESH')
bpy.context.view_layer.update()
# Se mide la malla convertida, no las dimensiones provisionales de la curva.
corners = [sign.matrix_world @ Vector(corner) for corner in sign.bound_box]
width = max(v.x for v in corners) - min(v.x for v in corners)
height = max(v.z for v in corners) - min(v.z for v in corners)
sign.scale *= min(1.90 / width, .302 / height)
bpy.context.view_layer.update()
corners = [sign.matrix_world @ Vector(corner) for corner in sign.bound_box]
sign.location.x -= (max(v.x for v in corners) + min(v.x for v in corners)) / 2
sign.location.z += 2.935 - (max(v.z for v in corners) + min(v.z for v in corners)) / 2
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
scene['nombre_institucional'] = 'Instituto de Victimología de Usina de Justicia'
for side in [-1, 1]:
    x = side * 1.52
    box('IVU_Aplique_base_' + str(side), (x, 1.78, -.30), (.15, .47, .04), brass, .025)
    box('IVU_Aplique_pantalla_' + str(side), (x, 1.86, -.10), (.22, .26, .24), brass, .025)

# Volúmenes abstractos solo para evaluar escala y sombras en el render de trabajo.
random.seed(19)
for row in range(5):
    x = -.94
    for i in range(25):
        width = random.uniform(.041, .074)
        height = random.uniform(.26, .37)
        if i in [8, 18]:
            x += .10
        if x + width > .97:
            break
        box(f'BookPlaceholder_{row:02}_{i:03}', (x + width / 2, .30 + row * .48 + height / 2, .09),
            (width, height, .26), cloth[(i + row * 2) % len(cloth)], .002, preview_collection)
        x += width + .013
        if x > .94:
            break


def aim(obj, target):
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat('-Z', 'Y').to_euler()


def area(name, location, energy, color, size, target):
    data = bpy.data.lights.new(name, 'AREA')
    data.energy, data.color, data.shape, data.size = energy, color, 'DISK', size
    obj = bpy.data.objects.new(name, data)
    studio_collection.objects.link(obj)
    obj.location = location
    aim(obj, target)


area('IVU_Key', (-2.4, -3.0, 4.3), 450, (1, .86, .70), 3.5, (0, 0, 1.4))
area('IVU_Fill', (3, -2, 2.9), 190, (.77, .85, 1), 3, (0, 0, 1.5))
area('IVU_Top', (0, -.5, 3.5), 100, (1, .76, .48), 2, (0, 0, 1.4))
scene.world = bpy.data.worlds.new('IVU_Ambiente')
scene.world.use_nodes = True
scene.world.node_tree.nodes['Background'].inputs[0].default_value = (.27, .25, .22, 1)
scene.world.node_tree.nodes['Background'].inputs[1].default_value = .45
camera_data = bpy.data.cameras.new('IVU_Camara_trabajo')
camera = bpy.data.objects.new('IVU_Camara_trabajo', camera_data)
studio_collection.objects.link(camera)
camera.location = (.10, -6.1, 1.95)
aim(camera, (0, 0, 1.62))
camera_data.type = 'PERSP'
camera_data.lens = 47
scene.camera = camera
scene.render.engine = 'CYCLES'
scene.cycles.samples = 24
scene.cycles.use_denoising = True
scene.render.resolution_x, scene.render.resolution_y = 1000, 1200
scene.render.resolution_percentage = 100
scene.view_settings.view_transform = 'AgX'

models = ROOT / 'public' / 'models'
sources = ROOT / 'assets' / 'blender'
previews = ROOT / 'output' / 'blender'
for folder in [models, sources, previews]:
    folder.mkdir(parents=True, exist_ok=True)
if args.preview:
    scene.render.filepath = str(previews / 'ivujus-bookshelf-preview.png')
    bpy.ops.render.render(write_still=True)
bpy.ops.object.select_all(action='DESELECT')
for obj in export_collection.objects:
    obj.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(models / 'ivujus-bookshelf.glb'), export_format='GLB',
    use_selection=True, export_cameras=False, export_lights=False, export_yup=True,
    export_extras=False, export_image_format='AUTO')
preview_collection.hide_render = True
preview_collection.hide_viewport = True
bpy.ops.wm.save_as_mainfile(filepath=str(sources / 'ivujus-bookshelf.blend'))
print('IVUJUS_EXPORT_OK', (models / 'ivujus-bookshelf.glb').stat().st_size)
