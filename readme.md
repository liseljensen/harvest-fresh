## Pre installed dependencies ##
Install Node : https://nodejs.org/
Install Bower: `npm install --global bower`

## Getting strated ##
 1. Download the master version, extract it
 2. Rename to project name
 3. Then open terminal from project dir and run `npm install`, `bower install`. Be patient
 4. Run `gulp serve --dev` to run your app

## Build Task ##
 1. Run `gulp clean` for clean project dir
 2. Run `gulp build --production`. This will generate production version into 'dist' folder with optimized version.
 3.  After gulp build complete `gulp htmlCopy` . This will copy html without optimized.
 4.  After build `gulp live-serve` This will serve build version.


## Fonts Included ##
1. Lato
2. Great Vibes
3. Roboto
4. Old Standard TT
5. http://www.dafont.com/fff-tusj.font **
6. http://www.dafont.com/dk-mango-smoothie.font
7. http://www.dafont.com/afecta.font
8. http://www.dafont.com/thank-you-drf.font
9. http://www.dafont.com/gobold.font
10. Roboto Slab

## Node Template with gulp-file-include
example  @@include('templates/_nav.html') will include nav into dist folder when build
