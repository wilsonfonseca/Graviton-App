/*
########################################
              MIT License

Copyright (c) 2019 Marc Espin Sanz

License > https://github.com/Graviton-Code-Editor/Graviton-App/blob/master/LICENSE.md

#########################################
*/

// Creating a window, example:

/*

const my_window = new Window({
    id:'my_window1',
    content:'This is a very big window! '
})

my_window.launch(); //Open the window

my_window.close(); //Close the window

closeWindow('my_window1'); //Close the window by passing the id

*/

'use strict'

module.exports = {
   Window: function(data) {
      /*
       * Window constructor
       * @param {object} data.id                 Unique ID for the window
       * @param {string} data.code               Window's content
       * @param {function} data.onClose (optional) When the window is closed the passed function will be executed
       */
      if (typeof [...arguments] !== 'object') {
         graviton.throwError('Parsed argument is not object.')
         return
      }
      this.id = data.id
      this.code = data.content
      this.onClose = data.onClose == undefined ? '' : data.onClose
      const newWindow = document.createElement('div')
      newWindow.setAttribute('id', this.id + '_window')
      newWindow.innerHTML = `
      <div class="background_window" onclick="closeWindow('${
        this.id
      }'); ${this.onClose}"></div>
      <div id="${this.id + '_body'}" class="body_window">
          ${this.code}
      </div>`
      this.myWindow = newWindow
      this.launch = function() {
         document
            .getElementById('body')
            .setAttribute(
               'windows',
               Number(document.getElementById('body').getAttribute('windows')) + 1
            ) // Plus an opened screen
         document.body.appendChild(this.myWindow)
      }
      this.close = function() {
         document
            .getElementById('body')
            .setAttribute(
               'windows',
               Number(document.getElementById('body').getAttribute('windows')) - 1
            ) // Substract an opened screen
         document.getElementById(`${this.id}_window`).remove()
      }
   },
   /*
    * Close a window by it's id
    * @param {string} id  Window's unique window
    */
   closeWindow: id => {
      document
         .getElementById('body')
         .setAttribute(
            'windows',
            Number(document.getElementById('body').getAttribute('windows')) - 1
         )
      document.getElementById(`${id}_window`).remove()
   }
}