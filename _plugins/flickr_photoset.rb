# Flickr Photoset Tag
#
# A Jekyll plug-in for embedding Flickr photoset in your Liquid templates.
#
# Usage:
#
#   {% flickr_photoset 72157624158475427 %}
#   {% flickr_photoset 72157624158475427 "Square" "Medium 640" "Large" "Site MP4" %}
#
# For futher information please visit: https://github.com/j0k3r/jekyll-flickr-photoset
#
# Author: Jeremy Benoist
# Source: https://github.com/j0k3r/jekyll-flickr-photoset

gem 'flickraw'
require 'shellwords'

module Jekyll

  class FlickrPhotosetTag < Liquid::Tag

    def initialize(tag_name, markup, tokens)
      super
      params = Shellwords.shellwords markup

      @photoset       = params[0]
      @photoThumbnail = params[1] || "Large Square"
      @photoEmbeded   = params[2] || "Medium 640"
      @photoOpened    = params[3] || "Large"
      @photoOpened2   = params[3] || "Original"
      @video          = params[4] || "Site MP4"

    end

    def render(context)
      # hack to convert a variable into an actual flickr set id
      if @photoset =~ /([\w]+\.[\w]+)/i
        @photoset = Liquid::Template.parse('{{ '+@photoset+' }}').render context
      end

      flickrConfig = context.registers[:site].config["flickr"]

      if cache_dir = flickrConfig['cache_dir']
        if !Dir.exist?(cache_dir)
          Dir.mkdir(cache_dir, 0777)
        end

        path = File.join(cache_dir, "#{@photoset}-#{@photoThumbnail}-#{@photoEmbeded}-#{@photoOpened}-#{@video}.yml")
        if File.exist?(path)
          photos = YAML::load(File.read(path))
        else
          photos = generate_photo_data(@photoset, flickrConfig)
          File.open(path, 'w') {|f| f.print(YAML::dump(photos)) }
        end
      else
        photos = generate_photo_data(@photoset, flickrConfig)
      end

      if photos.count == 1
        if photos[0]['urlVideo'] != ''
          output = "<p style=\"text-align: center;\">\n"
          output += "  <video controls poster=\"#{photos[0]['urlEmbeded']}\">\n"
          output += "    <source src=\"#{photos[0]['urlVideo']}\" type=\"video/mp4\" />\n"
          output += "  </video>\n"
          output += "  <br/><span class=\"alt-flickr\"><a href=\"#{photos[0]['urlFlickr']}\" target=\"_blank\">Voir la video en grand</a></span>\n"
          output += "</p>\n"
        else
          output = "<p style=\"text-align: center;\"><img class=\"th\" src=\"#{photos[0]['urlEmbeded']}\" title=\"#{photos[0]['title']}\" longdesc=\"#{photos[0]['title']}\" alt=\"#{photos[0]['title']}\" /></p>\n"
        end
      else
        output = "    <ul class=\"post-gallery-list\" id=\"post-gallery\">\n"

        photos.each do |photo|
          if photo['urlVideo'] != ''
            output += "      <li>\n"
            output += "        <video controls poster=\"#{photo['urlEmbeded']}\">\n"
            output += "          <source src=\"#{photo['urlVideo']}\" type=\"video/mp4\" />\n"
            output += "        </video>\n"
            output += "        <br/><span class=\"alt-flickr\"><a href=\"#{photo['urlFlickr']}\" target=\"_blank\">Voir la video en grand</a></span>\n"
            output += "      </li>\n"
          else
            output += "      <li><a rel=\"gallery\" class=\"post-gallery-link\" href=\"#{photo['urlOpened']}\" title=\"#{photo['title']}\"><img class=\"lazyload\" src=\"data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMtaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MSA2NC4xNDA5NDksIDIwMTAvMTIvMDctMTA6NTc6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUuMSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RERBNkFGN0I5N0VCMTFFN0JCNDFBQTUzODA1RTc3OTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RERBNkFGN0M5N0VCMTFFN0JCNDFBQTUzODA1RTc3OTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEREE2QUY3OTk3RUIxMUU3QkI0MUFBNTM4MDVFNzc5MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEREE2QUY3QTk3RUIxMUU3QkI0MUFBNTM4MDVFNzc5MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uACZBZG9iZQBkwAAAAAEDABUEAwYKDQAABycAAAi4AAALYgAADm//2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwMBAQEBAQEBAgEBAgICAQICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//CABEIAJYAlgMBEQACEQEDEQH/xADEAAEBAQADAQEBAAAAAAAAAAAAAQYEBQcDAgkBAQEBAQEAAAAAAAAAAAAAAAADAgEEEAABAgUEAwEBAAAAAAAAAAAAAQIwEQMEBSExFDQQYDIgExEAAgADAwgHBgcAAAAAAAAAAQIAEQMxEnIwIZGxkrIENBBRMtITc6NgQYFCUiMgYXGhYmOTEgEAAAAAAAAAAAAAAAAAAACAEwABAwIDCQADAQEBAAAAAAABABExIXEgUcEQMEDwQWGBobHR4fFgcJH/2gAMAwEAAhEDEQAAAf7M+vxwAAAAAAAAoIAAAAAAAAUEAAAAAAAAKCAAAAAAAAFBAAAAAAAACggAIAAAAUAFBAAYSssZSd4AAnXpsL6HOgBQQAGErLkc1s57hTpdZ4neZfeNZOmhzoAUEABhKy5HNa6e/NbR9KjbHUn1us/I1k6aHOgBQQAGErLkc1x+8xVJaTG/S426TWcdSesnTQ50AKCAAwlZfTncRWf5cHZ51Tn87rJ00OdACggAMJWX4d+nFAPuZ/WdjOmhzoAUEABjqTye8AAAegyr3mdACggAAAAAAABQQAAAAAAAAoIAAAAAAAAUEAAAAAAAAKCAAAAAAAAFBAAAAAAAACn/2gAIAQEAAQUC93zH1qScScScScScamM6cLM/WG+PN3estEtMi24fle3i+nCzP1hvh7m02syFRt0x7ajcpbVXux9pWWvle3i+nCzP1hvjK3M1Mfecdw6+pf3yvbxfThZn6xKyoqquXxy7j+Nl28r28X04WZ+sXVosp8PGHDxhw8YcPGFKhjqVTJPZUusX04WVo1aq8O6OHdHDujh3Rw7o4d0cO6Mex9O193//2gAIAQIAAQUC93bAXeE0d+ESZIQXeE0d4l4QUQXeE0cJ4VPEhBd4TR34kLsgu8JopNSak1JqaiC7wkJkyZMmTJi+8f/aAAgBAwABBQL3d0BNoThv4VRFF3TaE4b4n4UQXdNoThovhF8TF3TaE4T8puu6bQnCEkJISQkhoKJtCU1NTU1NTU1E293/AP/aAAgBAgIGPwI0/wD/2gAIAQMCBj8CNP8A/9oACAEBAQY/AvaW0aYtGmLRpi0aYtGmLRpi0acpw+GprWPf+8WNoMWNoMWNoMWNoMWNoMe+Ex1N7J8Phqa1ivjTdP4FzX3axZyzdbHqjw2Tw3PZz3laVosEjB8unqMJjqb2T4fDU1rFfGm6YZ2MlUEk/kIauZ3HzNT/AKx2QP5LCuhmrCYMLWpqXAW4wXORIkgy94zwlVkZEpm9NgVmZZgJ2wfLp6jCY6m9k+Hw1NaxXxpumBwyGyTVf1+VPhb0eHUP2XP+bfVh6+inw9P7jM4VmHZT4/M0Hy6eowmOpvZPh8NTWscUeog6EYwWYzLGZPWT0ihfNwdXaK/SWtuiOH8wQfLp6jCY6m9k+Hw1NaxxC1aiJfI7TATF0gyjmvWTuxzXrJ3Y5r1k7sc16yd2EqLxQvIbwnVSXxzQWRg6+GgmpmM0Jjqb2To+HTZ5B53ROUyscvV2Y5ersxy9XZjl6uzHL1dmOXq7McvV2YVXUo158xtzt7cf/9oACAEBAwE/ITJvwWdtQjJvwWdtQjJvwWdtQjJvwWdtQjJvwWdtQjJvhcZgXICcfoflOP0PynH6H5Tj9D8px+h+U4/Q/KcfofnFnbUIyb4oIBwDsC+LkHRcg6LkHRcg6LkHRFksu4+rmGbDnbUIyb7oC4EBN+RsASxaFnRRyqOyJbSDuEjI87HnIM2HO2oRk3xgXHZLGwPp6d07EKH9BQ6BmoPUvmgVRw3UH4R1HQobzIYswRqSbQnmTh4+AYAuJrkNjzkGbDnbUIyb4wLiMRxHWf2O7bO6yE9Wje78kKsRV6girgwQeoKfQ/MpVfxIFBsecgzYc7ahGTfEBMJkS8OEfyEXIUOkhyT5O00vPjoMjxEFzPI7HnIM2HO2oRk3xAWGKwCJDzsnwttNNFyAwHkRkAllRDxRwC4cdQuQZsOdtQjJvhL4sfKAe7L+5X9yv7lf3K/uV/cr+5Q18ORsAIQW7jDnbUIyb8FnbUIyb8FnbUIyb8FnbUIyb8FnbUIyb8FnbUIyb8FnbUL/2gAIAQIDAT8h/wCIIBbVR38MZthiEQZlHfQPXY5UTsczqO9khgY77CO9j8Kq5UUd5GAmJiYmJiYmKX+4/9oACAEDAwE/If8AhaQwMJ2m+pBQnO6mqEygL76kEfTYxbZJt9SJwOWbooN9Qw1V3V3V3V3UAJd1PeQkwmyJsibImyJsibImyf7m/9oADAMBAAIRAxEAABAttttttttslttttttttkttttttttslttttttttkttttttttsltvtttvttktt2//wDObbJbbqfbNzbZLbdWy9ubbJbbqlv9zbZLbd8t2ubbJbbsySOzbZLbZSSSXbbJbbbbbbbbZLbbbbbbbbJbbbbbbbbZLbbbbbbbbJbbbbbbbbZLbbbbbbbbP//aAAgBAQMBPxD3H08EItI9x9PBCLSPcfTwQi0j3H08EItI9x9PBCLSPcfThIJ8gLOQ+4xYsWLFixAg1BBGYII/9DjCItI9x9OEyGCRkkj/AMk4kSJLTdhbF48ePHhyz2WfMYLMLFGS4Sc2uGEWke4+ncBy+jOOod2cdHbYIKYcrEVNSAIgMAEoTrY25BQOMQCCABq9DiQBhFpHuPpxhy4TR5swLZmoHUgFWNbkmmElh56gA0JRMknzQkqhKgINVVXBdfsCyDBJAPQoh2wgKq+yMBgS5GNAGEWke4+nGHLyAZBkGEdBIDmDodhwkF0Q4ahIzIAjtIFyAEgABAAA4BwAXBFCEGEBw3lEA7FEhJemNAGEWke4+nEHYNpKejl1EgRzDtuTHj1O0KFrZcwCFLqrLULFwABjYoAwi0j3H04g9QMnTUuuexAKAAA6gAt4A444awSWiACNV0IRNVCOYsZiHTXEGEWke4+nCS3oHAyRbBEmsuXNVy5quXNVy5quXNVy5quXNUasZ84EUCsO2ERaR7j6eCEWke4+nghFpHuPp4IRaR7j6eCEWke4+nghFpHuPp4IRaR//9oACAECAwE/EBHBiODEcGI4MRwYjExTFMUxTFMUxxiMPV4VFRUVFRUVFJiEYerxqpC2AnYAjCyoX3UmIRh6vGqkLIAksJKJmpHVEEFjKCDqJ9CpK+6kxCMPV41UhZdf42NNgDw6BfdSYhGHq8arkXTAUEbeiVU1l91JiEYerxqhIggEsux6K7Hpdj0ux6RCJCh7ICGmXUmIRheHLQu6F3Qu6F3Qu6F3Qu6EYJkRiEcGI4MRwYjgxHBiOD//2gAIAQMDAT8Q/wBvMedEwTBMEwTBMEwUVzu5DzopL4A0yUA3UK+Sgud3IedFJdEgHMBAWWeiBAMgo4sqjhJBAC+Sgud3IedFJdPlvnY9Yy2EWjUkr5KC53ch50RsbmFNdvXU9hfJQXO7kPOiAIEzrkELkELkELkEIICod0QLxDKC53ZgMJld4u8XeLvF3i7xd4gIYaF/9x//2Q==\" data-src=\"#{photo['urlThumb']}\" alt=\"#{photo['title']}\"><noscript><img src=\"#{photo['urlThumb']}\" alt=\"#{photo['title']}\"/></noscript></a></li>\n"
          end
        end

        output += "    </ul>\n"
      end

      # return content
      output
    end
    puts  ENV['FLICKR_ACCESS_TOKEN']
    def generate_photo_data(photoset, flickrConfig)
      returnSet = Array.new
      FlickRaw.api_key       = ENV['FLICKR_API_KEY']
      FlickRaw.shared_secret = ENV['FLICKR_SHARED_SECRET']
      flickr.access_token    = ENV['FLICKR_ACCESS_TOKEN']
      flickr.access_secret   = ENV['FLICKR_ACCESS_SECRET']

      begin
        flickr.test.login
      rescue Exception => e
        raise "Bad token: #{flickrConfig['access_token']} #{e}"
      end

      begin
        photos = flickr.photosets.getPhotos :photoset_id => photoset
      rescue Exception => e
        raise "Bad photoset: #{photoset}"
      end

      photos.photo.each_index do | i |


        title = photos.photo[i].title
        id    = photos.photo[i].id

        urlThumb   = String.new
        urlEmbeded = String.new
        urlOpened  = String.new
        urlOpened2  = String.new
        urlVideo   = String.new

        sizes = flickr.photos.getSizes(:photo_id => id)

        urlThumb       = sizes.find {|s| s.label == @photoThumbnail }
        urlEmbeded     = sizes.find {|s| s.label == @photoEmbeded }
        urlOpened      = sizes.find {|s| s.label == @photoOpened }
        urlOpened2      = sizes.find {|s| s.label == @photoOpened2 }
        urlVideo       = sizes.find {|s| s.label == @video }

        photo = {
          'title' => title,
          'urlThumb' => urlThumb ? urlThumb.source : '',
          'urlEmbeded' => urlEmbeded ? urlEmbeded.source : '',
          'urlOpened' => urlOpened ? urlOpened.source : '',
          'urlOpened2' => urlOpened2 ? urlOpened2.source : '',
          'urlVideo' => urlVideo ? urlVideo.source : '',
          'urlFlickr' => urlVideo ? urlVideo.url : '',
        }

        returnSet.push photo
      end

      # sleep a little so that you don't get in trouble for bombarding the Flickr servers
      sleep 1

      returnSet
    end
  end
end

Liquid::Template.register_tag('flickr_photoset', Jekyll::FlickrPhotosetTag)
