window.wp=window.wp||{},function(e,d){var n;"undefined"!=typeof _wpPluploadSettings&&(n=function(e){var o=this,t=-1!=navigator.userAgent.indexOf("Trident/")||-1!=navigator.userAgent.indexOf("MSIE "),r={container:"container",browser:"browse_button",dropzone:"drop_element"},i,a;if(this.supports={upload:n.browser.supported},this.supported=this.supports.upload,this.supported){for(i in this.plupload=d.extend(!0,{multipart_params:{}},n.defaults),this.container=document.body,d.extend(!0,this,e),this)d.isFunction(this[i])&&(this[i]=d.proxy(this[i],this));for(i in r)this[i]&&(this[i]=d(this[i]).first(),this[i].length?(this[i].prop("id")||this[i].prop("id","__wp-uploader-id-"+n.uuid++),this.plupload[r[i]]=this[i].prop("id")):delete this[i]);(this.browser&&this.browser.length||this.dropzone&&this.dropzone.length)&&(t||"flash"!==plupload.predictRuntime(this.plupload)||this.plupload.required_features&&this.plupload.required_features.hasOwnProperty("send_binary_string")||(this.plupload.required_features=this.plupload.required_features||{},this.plupload.required_features.send_binary_string=!0),this.uploader=new plupload.Uploader(this.plupload),delete this.plupload,this.param(this.params||{}),delete this.params,a=function(e,t,r){r.attachment&&r.attachment.destroy(),n.errors.unshift({message:e||pluploadL10n.default_error,data:t,file:r}),o.error(e,t,r)},this.uploader.bind("init",function(e){var t,r,i,a=o.dropzone;if(i=o.supports.dragdrop=e.features.dragdrop&&!n.browser.mobile,a){if(a.toggleClass("supports-drag-drop",!!i),!i)return a.unbind(".wp-uploader");a.bind("dragover.wp-uploader",function(){t&&clearTimeout(t),r||(a.trigger("dropzone:enter").addClass("drag-over"),r=!0)}),a.bind("dragleave.wp-uploader, drop.wp-uploader",function(){t=setTimeout(function(){r=!1,a.trigger("dropzone:leave").removeClass("drag-over")},0)}),o.ready=!0,d(o).trigger("uploader:ready")}}),this.uploader.bind("postinit",function(e){e.refresh(),o.init()}),this.uploader.init(),this.browser?this.browser.on("mouseenter",this.refresh):(this.uploader.disableBrowse(!0),d("#"+this.uploader.id+"_html5_container").hide()),this.uploader.bind("FilesAdded",function(e,t){_.each(t,function(e){var t,r;plupload.FAILED!==e.status&&(t=_.extend({file:e,uploading:!0,date:new Date,filename:e.name,menuOrder:0,uploadedTo:wp.media.model.settings.post.id},_.pick(e,"loaded","size","percent")),(r=/(?:jpe?g|png|gif)$/i.exec(e.name))&&(t.type="image",t.subtype="jpg"===r[0]?"jpeg":r[0]),e.attachment=wp.media.model.Attachment.create(t),n.queue.add(e.attachment),o.added(e.attachment))}),e.refresh(),e.start()}),this.uploader.bind("UploadProgress",function(e,t){t.attachment.set(_.pick(t,"loaded","percent")),o.progress(t.attachment)}),this.uploader.bind("FileUploaded",function(e,t,r){var i;try{r=JSON.parse(r.response)}catch(e){return a(pluploadL10n.default_error,e,t)}return!_.isObject(r)||_.isUndefined(r.success)?a(pluploadL10n.default_error,null,t):r.success?(_.each(["file","loaded","size","percent"],function(e){t.attachment.unset(e)}),t.attachment.set(_.extend(r.data,{uploading:!1})),wp.media.model.Attachment.get(r.data.id,t.attachment),(i=n.queue.all(function(e){return!e.get("uploading")}))&&n.queue.reset(),void o.success(t.attachment)):a(r.data&&r.data.message,r.data,t)}),this.uploader.bind("Error",function(e,t){var r=pluploadL10n.default_error,i;for(i in n.errorMap)if(t.code===plupload[i]){r=n.errorMap[i],_.isFunction(r)&&(r=r(t.file,t));break}a(r,t,t.file),e.refresh()}))}},d.extend(n,_wpPluploadSettings),n.uuid=0,n.errorMap={FAILED:pluploadL10n.upload_failed,FILE_EXTENSION_ERROR:pluploadL10n.invalid_filetype,IMAGE_FORMAT_ERROR:pluploadL10n.not_an_image,IMAGE_MEMORY_ERROR:pluploadL10n.image_memory_exceeded,IMAGE_DIMENSIONS_ERROR:pluploadL10n.image_dimensions_exceeded,GENERIC_ERROR:pluploadL10n.upload_failed,IO_ERROR:pluploadL10n.io_error,HTTP_ERROR:pluploadL10n.http_error,SECURITY_ERROR:pluploadL10n.security_error,FILE_SIZE_ERROR:function(e){return pluploadL10n.file_exceeds_size_limit.replace("%s",e.name)}},d.extend(n.prototype,{param:function(e,t){if(1===arguments.length&&"string"==typeof e)return this.uploader.settings.multipart_params[e];1<arguments.length?this.uploader.settings.multipart_params[e]=t:d.extend(this.uploader.settings.multipart_params,e)},init:function(){},error:function(){},success:function(){},added:function(){},progress:function(){},complete:function(){},refresh:function(){var e,t,r,i;if(this.browser){for(e=this.browser[0];e;){if(e===document.body){t=!0;break}e=e.parentNode}t||(i="wp-uploader-browser-"+this.uploader.id,(r=d("#"+i)).length||(r=d('<div class="wp-uploader-browser" />').css({position:"fixed",top:"-1000px",left:"-1000px",height:0,width:0}).attr("id","wp-uploader-browser-"+this.uploader.id).appendTo("body")),r.append(this.browser))}this.uploader.refresh()}}),n.queue=new wp.media.model.Attachments([],{query:!1}),n.errors=new Backbone.Collection,e.Uploader=n)}(wp,jQuery);