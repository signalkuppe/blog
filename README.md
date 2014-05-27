# Personal blog based on jekyll

[http://www.signalkuppe.com](http://www.signalkuppe.com)

## Requirements


1. [Ruby](https://www.ruby-lang.org/it/)
2. [flickraw](http://hanklords.github.io/flickraw/)
3. [s3_website](https://github.com/laurilehmijoki/s3_website)
3  [i18n](https://github.com/svenfuchs/i18n)
3. [Compass](http://compass-style.org/)
4. [Jekyll](http://jekyllrb.com/)
5. [Bower](http://bower.io/)

## Configuration

Follow the instructions of flickraw and s3_website to get the right keys

## Quickstart

Go to the project directory and run 

```shell
bower install
jekyll build
jekyll serve
```

To upload the blog to s3

```shell
s3_website push
```

Now you should be able to see the blog by visiting **http://0.0.0.0:4000** in your browser






