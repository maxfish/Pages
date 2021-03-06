'use strict';

const WASM_URL = 'main.wasm';
var wasm;


// Load and run the wasm
function init() {
    const go = new Go();
    if ('instantiateStreaming' in WebAssembly) {
        WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(function (obj) {
            wasm = obj.instance;
            go.run(wasm); // Initial setup
        })
    } else {
        fetch(WASM_URL).then(resp =>
            resp.arrayBuffer()
        ).then(bytes =>
            WebAssembly.instantiate(bytes, go.importObject).then(function (obj) {
                wasm = obj.instance;
                go.run(wasm);
            })
        )
    }
}


/*  This JavaScript file holds helper functions that improve speed (or reduce garbage collection waste) when
 *  working with Wasp.
 */

init();
