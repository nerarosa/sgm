$(function () {
    'use strict';
      var console = window.console || { log: function () {} };
    
      let options = {
              "url": url_blog+"feeds/posts/summary/-/Photo",
              "dataSend":{
                  "max-results": 10				
              }
          };
      getAjax(options, function(data){
          if(data == "errFeed"){
              $('.docs-toggles ul.list-group').html('<li class="list-group-item">Error</li>');
          }else{
              var pTitle, pUrl, pThumb, htmlEmbed = '',
              entry = data.feed.entry;
              if(entry != undefined){
                  for (let i = 0, len = entry.length; i < len; i++) {
                      for (let j in entry[i].link){
                           if (entry[i].link[j].rel == "alternate"){
                              pUrl = entry[i].link[j].href;
                              break;
                          }
                      }                
                      pTitle = entry[i].title.$t;
                      
                      pThumb = "media$thumbnail" in entry[i] ? imageHostFix(resizeImg(entry[i].media$thumbnail.url, {"w":"500","h":"200","crop": "c"})) : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXMzMzKUkQnAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
                      
                      htmlEmbed += '<li style="background: url('+ pThumb +') center center no-repeat; background-size: 100% auto;height: 100px;" class="list-group-item"><a target="_blank" class="other-post-url" href="'+ pUrl +'">'+ pTitle +'</a></li>';
                  }
              }else{
                  htmlEmbed = '<li class="list-group-item">No Result</li>';
              }
              
              $('.docs-toggles ul.list-group').html(htmlEmbed);
          }
      });
    
  function getPostByDate(date, type){	
      
      //date = encodeURIComponent(date).replace("%2B", "+");
      //date = date.replace("+", "%2B");
      
       if(typeof type === undefined) type = "Min";
      
      let options = {
              "url": url_blog+"feeds/posts/summary/-/Photo",
              "dataSend":{
                  "max-results": 2
              }
          };
      
      if(type == "Max")
          options.dataSend["published-max"] = date;
      else
          options.dataSend["published-min"] = date;
              
      getAjax(options, function(data){
          if(data != "errFeed"){			
              var urlPost='', idPost='',
              entry = data.feed.entry;
              
              if(entry !== undefined){
                  for(let i = 0, len = entry.length; i < len; i++){
                      idPost = entry[i].id.$t.substr(entry[i].id.$t.lastIndexOf("-")+1);
                      
                      if(idPost == $.url("?idp")) continue;
                      
                      for(let j in entry[i].link){
                          if(entry[i].link[j].rel == "alternate"){
                              urlPost = entry[i].link[j].href;
                              break;
                          }
                      }
                      
                      if(type=="Max")
                          $('.pPrev').attr('onclick', "location.href = '"+ url_blog +"p/viewer.html?idp="+ idPost +"';").prop("disabled", false);
                      else
                          $('.pNext').attr('onclick', "location.href = '"+ url_blog +"p/viewer.html?idp="+ idPost +"';").prop("disabled", false);	
                  }
  
              }		
          }
      });
  }  
    
      //generate image list
      var idp = $.url("?idp");
      
      if(typeof idp != "undefined" && idp != ''){
          var pUrl = url_blog + "feeds/posts/default/" + idp + "?alt=json-in-script";
          
          let options = {
              "url": url_blog+"feeds/posts/default/" + idp			
          };
          
          getAjax(options, function(data){
              if(data != "errFeed"){
                  var pListThumb, pTitle, pUrl,
                  entry=data.entry;
  
                  if (entry !== undefined) {					
                      for (let j in entry.link) {
                          if (entry.link[j].rel == "alternate") {
                              pUrl = entry.link[j].href;
                          }
                      }
                      
                      pTitle = entry.title.$t;					
  
                      var dPost = entry.published.$t;
                      getPostByDate(dPost);
                      getPostByDate(dPost, "Max");
                      
                      var content = "content" in entry ? entry.content.$t : "";
                      
                      var allImg = $(content).find("img");
                      var i = 0;
                      var listHTML = '';
                      
                      while(allImg[i]){
                          if(i > 0){
                              var linkimg = $(allImg[i]).parent('a').attr("href");
                              
                              listHTML += '<li><img data-original="'+ imageHostFix(resizeImg(linkimg, {"s":"0","crop": "no", "q":"100"})) +'" src="' + imageHostFix(resizeImg(linkimg, {"s":"480","crop": "c"})) + '"/></li>';
                          }
                          i++;
                      }
                      
                      if(listHTML != ''){
                          $("h1.page-header").html(pTitle);
                          $(".docs-pictures").html(listHTML);
                          
                          if ( 'undefined' !== typeof FB ){
                              $(".viewer-comments").html('<div class="fb-comments" data-href="' + pUrl + '" data-numposts="10" data-width="100%" data-colorscheme="light"></div>')
                              FB.XFBML.parse();
                          }	
                      
                          //init viewer	
                          var $images = $('.docs-pictures');					
                          var $buttons = $('.docs-buttons');
                          
                          var dataDl = '';
                          var addCropBtn = function (e) {
                              $('.viewer-toolbar').append('<li data-urlimg="" class="viewer-crop"><i class="fa fa-crop" aria-hidden="true"></i></li>').prepend('<li class="viewer-dl" data-urlimg=""><i class="fa fa-download" aria-hidden="true"></i></li>');
                              $('.viewer-toolbar').on('click', '.viewer-crop', function(){
                                  var data = $(this).data('urlimg');
                                  if(data == '' || data === undefined){
                                      return;
                                  }
                                  
                                  window.location.href = url_blog + 'p/cropper.html?img=' + data;
                              });
                              $('.viewer-toolbar').on('click', '.viewer-dl', function(){
                                  if(dataDl == '')
                                      dataDl = $(this).data('urlimg');
                                  
                                  if(dataDl == '' || dataDl === undefined){
                                      return;
                                  }
                                  
                                  /*var linkDl = document.createElement('a');
                                  linkDl.href = dataDl;
                                  linkDl.download = 'SGMImage';
                                  linkDl.setAttribute("hidden", true);
                                  linkDl.style.display = 'none';
                                  document.body.appendChild(linkDl);
                                  linkDl.click();
                                  document.body.removeChild(linkDl);*/
                                  
                                  var theImage = new Image();
                                  theImage.src = dataDl;
                                  var winWidth = theImage.width + 20;
                                  var winHeight = theImage.height + 20;
                                  window.open(dataDl,  null, 'height=' + winHeight + ', width=' + winWidth + ', toolbar=0, location=0, status=0, scrollbars=1, resizable=1'); 
  
                                  return false;
                              });
                          };
                          var changeUrlImg = function(e){							
                              let instance = $(this).data('viewer');
                              $('.docs-pictures li').removeClass('current');
                              $('.docs-pictures li').eq(instance.index).addClass('current');							
                              
                              let urlimg = $(instance.$image).attr('src');
                              $('.viewer-crop').attr('data-urlimg', urlimg);
                              $('.viewer-dl').attr('data-urlimg', urlimg);
                              dataDl = urlimg;
                          }
                          var handler = function (e) {
                              console.log(e.type);
                          };
                          var options = {
                              url: 'data-original',
                              title: true,
                              maxZoomRatio: 2,
                              build: handler,
                              built: addCropBtn,
                              show: handler,
                              shown: handler,
                              hide: handler,
                              hidden: handler,
                              view: function(e){
                                  
                              },
                              viewed: changeUrlImg
                          };					
                          
                          $images.viewer(options);					
  
                          $images.viewer('show');
                          
                          $buttons.on('click', 'button', function () {
                              var data = $(this).data();
                              var args = data.arguments || [];
  
                              if (data.method) {
                                if (data.target) {
                                  $images.viewer(data.method, $(data.target).val());
                                } else {
                                  $images.viewer(data.method, args[0], args[1]);
                                }						  
                              }
                          });
                      
                      }
                  }
              }
          });
      }
      
      $('.closeWV').click(function(){
          window.close();
      });
  });