async function loadGLTF(modelPath, loader) {
    return new Promise((resolve, reject) =>
        loader.load(modelPath, (gltf) => resolve(gltf), null, reject)
    )
}

export default loadGLTF
