medusa
======

Free and Powerful CSS/JS Framework<br>
<br>
.class-names-agreement{}<br>
<br>
window.medusa = {} //core object<br>
window.medusa.modulename = function(){}


##Gulp flow

Нужен `nodejs`, какой нибудь `ruby` и что бы стоял гем `sass`.

Из коря каталога (на уровне с файлом package.json) выполнить `npm install` - установит все модули нужные для gulp, sass, etc.

Что бы разрабатывать достаточно запустить команду `gulp` - она запустит вотчер который будет следить за изменениями всех файлов в папке `src/stylesheets` и компилировать результат в папку `src/css`

Так же добавил таск который собирает стили в компактный формат, для этого нужно выполнить `gulp build` - возмет все стили и сложет их в папку `dist/css`. 

##help

`.editorconfig` — плагин для самых популярных редакторов, что бы у всех были единные отступы и переносы строк. Скачать можно [тут](http://editorconfig.org/).

