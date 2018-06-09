/* eslint-disable */
// This THREEx helper makes it easy to handle the fullscreen API
// * it hides the prefix for each browser
// * it hides the little discrepencies of the various vendor API
// * at the time of this writing (nov 2011) it is available in 
//   [firefox nightly](http://blog.pearce.org.nz/2011/11/firefoxs-html-full-screen-api-enabled.html),
//   [webkit nightly](http://peter.sh/2011/01/javascript-full-screen-api-navigation-timing-and-repeating-css-gradients/) and
//   [chrome stable](http://updates.html5rocks.com/2011/10/Let-Your-Content-Do-the-Talking-Fullscreen-API).

// # Code

/** @namespace */
var THREEx		= THREEx 		|| {};
THREEx.FullScreen	= THREEx.FullScreen	|| {};

/**
 * test if it is possible to have fullscreen
 *
 * @returns {Boolean} true if fullscreen API is available, false otherwise
 */
THREEx.FullScreen.available	= function()
{
    return this._hasWebkitFullScreen || this._hasMozFullScreen;
}

/**
 * test if fullscreen is currently activated
 *
 * @returns {Boolean} true if fullscreen is currently activated, false otherwise
 */
THREEx.FullScreen.activated	= function()
{
    if( this._hasWebkitFullScreen ){
        return document.webkitIsFullScreen;
    }else if( this._hasMozFullScreen ){
        return document.mozFullScreen;
    }else{
        console.assert(false);
    }
}

/**
 * Request fullscreen on a given element
 * @param {DomElement} element to make fullscreen. optional. default to document.body
 */
THREEx.FullScreen.request	= function(element)
{
    element	= element	|| document.body;
    if( this._hasWebkitFullScreen ){
        element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }else if( this._hasMozFullScreen ){
        element.mozRequestFullScreen();
    }else{
        console.assert(false);
    }
}

/**
 * Cancel fullscreen
 */
THREEx.FullScreen.cancel	= function()
{
    if( this._hasWebkitFullScreen ){
        document.webkitCancelFullScreen();
    }else if( this._hasMozFullScreen ){
        document.mozCancelFullScreen();
    }else{
        console.assert(false);
    }
}

// internal functions to know which fullscreen API implementation is available
THREEx.FullScreen._hasWebkitFullScreen	= 'webkitCancelFullScreen' in document	? true : false;
THREEx.FullScreen._hasMozFullScreen	= 'mozCancelFullScreen' in document	? true : false;

/**
 * Bind a key to renderer screenshot
 * usage: THREEx.FullScreen.bindKey({ charCode : 'a'.charCodeAt(0) });
 */
THREEx.FullScreen.bindKey	= function(opts){
    opts		= opts		|| {};
    var charCode	= opts.charCode	|| 'f'.charCodeAt(0);
    var dblclick	= opts.dblclick !== undefined ? opts.dblclick : false;
    var element	= opts.element

    var toggle	= function(){
        if( THREEx.FullScreen.activated() ){
            THREEx.FullScreen.cancel();
        }else{
            THREEx.FullScreen.request(element);
        }
    }

    var onKeyPress	= function(event){
        if( event.which !== charCode )	return;
        toggle();
    }.bind(this);

    document.addEventListener('keypress', onKeyPress, false);

    dblclick && document.addEventListener('dblclick', toggle, false);

    return {
        unbind	: function(){
            document.removeEventListener('keypress', onKeyPress, false);
            dblclick && document.removeEventListener('dblclick', toggle, false);
        }
    };
}


// THREEx.KeyboardState.js keep the current state of the keyboard.
// It is possible to query it at any time. No need of an event.
// This is particularly convenient in loop driven case, like in
// 3D demos or games.
//
// # Usage
//
// **Step 1**: Create the object
//
// ```var keyboard	= new THREEx.KeyboardState();```
//
// **Step 2**: Query the keyboard state
//
// This will return true if shift and A are pressed, false otherwise
//
// ```keyboard.pressed("shift+A")```
//
// **Step 3**: Stop listening to the keyboard
//
// ```keyboard.destroy()```
//
// NOTE: this library may be nice as standaline. independant from three.js
// - rename it keyboardForGame
//
// # Code
//

/** @namespace */
var THREEx	= THREEx 		|| {};

/**
 * - NOTE: it would be quite easy to push event-driven too
 *   - microevent.js for events handling
 *   - in this._onkeyChange, generate a string from the DOM event
 *   - use this as event name
 */
THREEx.KeyboardState	= function()
{
    // to store the current state
    this.keyCodes	= {};
    this.modifiers	= {};

    // create callback to bind/unbind keyboard events
    var self	= this;
    this._onKeyDown	= function(event){ self._onKeyChange(event, true); };
    this._onKeyUp	= function(event){ self._onKeyChange(event, false);};

    // bind keyEvents
    document.addEventListener("keydown", this._onKeyDown, false);
    document.addEventListener("keyup", this._onKeyUp, false);
}

/**
 * To stop listening of the keyboard events
 */
THREEx.KeyboardState.prototype.destroy	= function()
{
    // unbind keyEvents
    document.removeEventListener("keydown", this._onKeyDown, false);
    document.removeEventListener("keyup", this._onKeyUp, false);
}

THREEx.KeyboardState.MODIFIERS	= ['shift', 'ctrl', 'alt', 'meta'];
THREEx.KeyboardState.ALIAS	= {
    'left'		: 37,
    'up'		: 38,
    'right'		: 39,
    'down'		: 40,
    'space'		: 32,
    'pageup'	: 33,
    'pagedown'	: 34,
    'tab'		: 9
};

/**
 * to process the keyboard dom event
 */
THREEx.KeyboardState.prototype._onKeyChange	= function(event, pressed)
{
    // log to debug
    //console.log("onKeyChange", event, pressed, event.keyCode, event.shiftKey, event.ctrlKey, event.altKey, event.metaKey)

    // update this.keyCodes
    var keyCode		= event.keyCode;
    this.keyCodes[keyCode]	= pressed;

    // update this.modifiers
    this.modifiers['shift']= event.shiftKey;
    this.modifiers['ctrl']	= event.ctrlKey;
    this.modifiers['alt']	= event.altKey;
    this.modifiers['meta']	= event.metaKey;
}

/**
 * query keyboard state to know if a key is pressed of not
 *
 * @param {String} keyDesc the description of the key. format : modifiers+key e.g shift+A
 * @returns {Boolean} true if the key is pressed, false otherwise
 */
THREEx.KeyboardState.prototype.pressed	= function(keyDesc)
{
    var keys	= keyDesc.split("+");
    for(var i = 0; i < keys.length; i++){
        var key		= keys[i];
        var pressed;
        if( THREEx.KeyboardState.MODIFIERS.indexOf( key ) !== -1 ){
            pressed	= this.modifiers[key];
        }else if( Object.keys(THREEx.KeyboardState.ALIAS).indexOf( key ) != -1 ){
            pressed	= this.keyCodes[ THREEx.KeyboardState.ALIAS[key] ];
        }else {
            pressed	= this.keyCodes[key.toUpperCase().charCodeAt(0)]
        }
        if( !pressed)	return false;
    };
    return true;
}



// This THREEx helper makes it easy to handle window resize.
// It will update renderer and camera when window is resized.
//
// # Usage
//
// **Step 1**: Start updating renderer and camera
//
// ```var windowResize = THREEx.WindowResize(aRenderer, aCamera)```
//
// **Step 2**: Start updating renderer and camera
//
// ```windowResize.stop()```
// # Code

//

/** @namespace */
var THREEx	= THREEx 		|| {};

/**
 * Update renderer and camera when the window is resized
 *
 * @param {Object} renderer the renderer to update
 * @param {Object} Camera the camera to update
 */
THREEx.WindowResize	= function(renderer, camera){
    var callback	= function(){
        // notify the renderer of the size change
        renderer.setSize( window.innerWidth, window.innerHeight );
        // update the camera
        camera.aspect	= window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    // bind the resize event
    window.addEventListener('resize', callback, false);
    // return .stop() the function to stop watching window resize
    return {
        /**
         * Stop watching window resize
         */
        stop	: function(){
            window.removeEventListener('resize', callback);
        }
    };
}
export {THREEx};
/* eslint-enable */