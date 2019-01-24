wp.mediaWidgets=function(u){"use strict";var w={controlConstructors:{},modelConstructors:{}};return w.PersistentDisplaySettingsLibrary=wp.media.controller.Library.extend({initialize:function e(t){_.bindAll(this,"handleDisplaySettingChange"),wp.media.controller.Library.prototype.initialize.call(this,t)},handleDisplaySettingChange:function e(t){this.get("selectedDisplaySettings").set(t.attributes)},display:function e(t){var i,n=this.get("selectedDisplaySettings");return(i=wp.media.controller.Library.prototype.display.call(this,t)).off("change",this.handleDisplaySettingChange),i.set(n.attributes),"custom"===n.get("link_type")&&(i.linkUrl=n.get("link_url")),i.on("change",this.handleDisplaySettingChange),i}}),w.MediaEmbedView=wp.media.view.Embed.extend({initialize:function(e){var t=this,i;wp.media.view.Embed.prototype.initialize.call(t,e),"image"!==t.controller.options.mimeType&&(i=t.controller.states.get("embed")).off("scan",i.scanImage,i)},refresh:function e(){var t;t="image"===this.controller.options.mimeType?wp.media.view.EmbedImage:wp.media.view.EmbedLink.extend({setAddToWidgetButtonDisabled:function e(t){this.views.parent.views.parent.views.get(".media-frame-toolbar")[0].$el.find(".media-button-select").prop("disabled",t)},setErrorNotice:function e(t){var i=this,n;n=i.views.parent.$el.find("> .notice:first-child"),t?(n.length||((n=u('<div class="media-widget-embed-notice notice notice-error notice-alt"></div>')).hide(),i.views.parent.$el.prepend(n)),n.empty(),n.append(u("<p>",{html:t})),n.slideDown("fast")):n.length&&n.slideUp("fast")},updateoEmbed:function(){var e=this,t;if(!(t=e.model.get("url")))return e.setErrorNotice(""),void e.setAddToWidgetButtonDisabled(!0);t.match(/^(http|https):\/\/.+\//)||(e.controller.$el.find("#embed-url-field").addClass("invalid"),e.setAddToWidgetButtonDisabled(!0)),wp.media.view.EmbedLink.prototype.updateoEmbed.call(e)},fetch:function(){var t=this,i,e,n,d,o,a,r;if(o=t.model.get("url"),t.dfd&&"pending"===t.dfd.state()&&t.dfd.abort(),i=function(e){t.renderoEmbed({data:{body:e}}),t.controller.$el.find("#embed-url-field").removeClass("invalid"),t.setErrorNotice(""),t.setAddToWidgetButtonDisabled(!1)},(d=document.createElement("a")).href=o,e=d.pathname.toLowerCase().match(/\.(\w+)$/))return n=e[1],void(wp.media.view.settings.embedMimes[n]?0!==wp.media.view.settings.embedMimes[n].indexOf(t.controller.options.mimeType)?t.renderFail():i("\x3c!--success--\x3e"):t.renderFail());(r=(a=/https?:\/\/www\.youtube\.com\/embed\/([^/]+)/).exec(o))&&(o="https://www.youtube.com/watch?v="+r[1],t.model.attributes.url=o),t.dfd=wp.apiRequest({url:wp.media.view.settings.oEmbedProxyUrl,data:{url:o,maxwidth:t.model.get("width"),maxheight:t.model.get("height"),discover:!1},type:"GET",dataType:"json",context:t}),t.dfd.done(function(e){t.controller.options.mimeType===e.type?i(e.html):t.renderFail()}),t.dfd.fail(_.bind(t.renderFail,t))},renderFail:function e(){var t=this;t.controller.$el.find("#embed-url-field").addClass("invalid"),t.setErrorNotice(t.controller.options.invalidEmbedTypeError||"ERROR"),t.setAddToWidgetButtonDisabled(!0)}}),this.settings(new t({controller:this.controller,model:this.model.props,priority:40}))}}),w.MediaFrameSelect=wp.media.view.MediaFrame.Post.extend({createStates:function e(){var t=this.options.mimeType,i=[];_.each(wp.media.view.settings.embedMimes,function(e){0===e.indexOf(t)&&i.push(e)}),0<i.length&&(t=i),this.states.add([new w.PersistentDisplaySettingsLibrary({id:"insert",title:this.options.title,selection:this.options.selection,priority:20,toolbar:"main-insert",filterable:"dates",library:wp.media.query({type:t}),multiple:!1,editable:!0,selectedDisplaySettings:this.options.selectedDisplaySettings,displaySettings:!!_.isUndefined(this.options.showDisplaySettings)||this.options.showDisplaySettings,displayUserSettings:!1}),new wp.media.controller.EditImage({model:this.options.editImage}),new wp.media.controller.Embed({metadata:this.options.metadata,type:"image"===this.options.mimeType?"image":"link",invalidEmbedTypeError:this.options.invalidEmbedTypeError})])},mainInsertToolbar:function e(t){var n=this;t.set("insert",{style:"primary",priority:80,text:n.options.text,requires:{selection:!0},click:function e(){var t=n.state(),i=t.get("selection");n.close(),t.trigger("insert",i).reset()}})},mainEmbedToolbar:function e(t){t.view=new wp.media.view.Toolbar.Embed({controller:this,text:this.options.text,event:"insert"})},embedContent:function e(){var t=new w.MediaEmbedView({controller:this,model:this.state()}).render();this.content.set(t),wp.media.isTouchDevice||t.url.focus()}}),w.MediaWidgetControl=Backbone.View.extend({l10n:{add_to_widget:"{{add_to_widget}}",add_media:"{{add_media}}"},id_base:"",mime_type:"",events:{"click .notice-missing-attachment a":"handleMediaLibraryLinkClick","click .select-media":"selectMedia","click .placeholder":"selectMedia","click .edit-media":"editMedia"},showDisplaySettings:!0,initialize:function e(t){var n=this;if(Backbone.View.prototype.initialize.call(n,t),!(n.model instanceof w.MediaWidgetModel))throw new Error("Missing options.model");if(!t.el)throw new Error("Missing options.el");if(!t.syncContainer)throw new Error("Missing options.syncContainer");if(n.syncContainer=t.syncContainer,n.$el.addClass("media-widget-control"),_.bindAll(n,"syncModelToInputs","render","updateSelectedAttachment","renderPreview"),!n.id_base&&(_.find(w.controlConstructors,function(e,t){return n instanceof e&&(n.id_base=t,!0)}),!n.id_base))throw new Error("Missing id_base.");n.previewTemplateProps=new Backbone.Model(n.mapModelToPreviewTemplateProps()),n.selectedAttachment=new wp.media.model.Attachment,n.renderPreview=_.debounce(n.renderPreview),n.listenTo(n.previewTemplateProps,"change",n.renderPreview),n.model.on("change:attachment_id",n.updateSelectedAttachment),n.model.on("change:url",n.updateSelectedAttachment),n.updateSelectedAttachment(),n.listenTo(n.model,"change",n.syncModelToInputs),n.listenTo(n.model,"change",n.syncModelToPreviewProps),n.listenTo(n.model,"change",n.render),n.$el.on("input change",".title",function e(){n.model.set({title:u.trim(u(this).val())})}),n.$el.on("input change",".link",function e(){var t=u.trim(u(this).val()),i="custom";n.selectedAttachment.get("linkUrl")===t||n.selectedAttachment.get("link")===t?i="post":n.selectedAttachment.get("url")===t&&(i="file"),n.model.set({link_url:t,link_type:i}),n.displaySettings.set({link:i,linkUrl:t})}),n.displaySettings=new Backbone.Model(_.pick(n.mapModelToMediaFrameProps(_.extend(n.model.defaults(),n.model.toJSON())),_.keys(wp.media.view.settings.defaultProps)))},updateSelectedAttachment:function e(){var t=this,i;0===t.model.get("attachment_id")?(t.selectedAttachment.clear(),t.model.set("error",!1)):t.model.get("attachment_id")!==t.selectedAttachment.get("id")&&(i=new wp.media.model.Attachment({id:t.model.get("attachment_id")})).fetch().done(function e(){t.model.set("error",!1),t.selectedAttachment.set(i.toJSON())}).fail(function e(){t.model.set("error","missing_attachment")})},syncModelToPreviewProps:function e(){var t=this;t.previewTemplateProps.set(t.mapModelToPreviewTemplateProps())},syncModelToInputs:function e(){var n=this;n.syncContainer.find(".media-widget-instance-property").each(function(){var e=u(this),t,i;i=e.data("property"),t=n.model.get(i),_.isUndefined(t)||(t="array"===n.model.schema[i].type&&_.isArray(t)?t.join(","):"boolean"===n.model.schema[i].type?t?"1":"":String(t),e.val()!==t&&(e.val(t),e.trigger("change")))})},template:function e(){var t=this;if(!u("#tmpl-widget-media-"+t.id_base+"-control").length)throw new Error("Missing widget control template for "+t.id_base);return wp.template("widget-media-"+t.id_base+"-control")},render:function e(){var t=this,i;t.templateRendered||(t.$el.html(t.template()(t.model.toJSON())),t.renderPreview(),t.templateRendered=!0),(i=t.$el.find(".title")).is(document.activeElement)||i.val(t.model.get("title")),t.$el.toggleClass("selected",t.isSelected())},renderPreview:function e(){throw new Error("renderPreview must be implemented")},isSelected:function e(){var t=this;return!t.model.get("error")&&Boolean(t.model.get("attachment_id")||t.model.get("url"))},handleMediaLibraryLinkClick:function e(t){var i=this;t.preventDefault(),i.selectMedia()},selectMedia:function e(){var n=this,t,d,i,o,a=[];n.isSelected()&&0!==n.model.get("attachment_id")&&a.push(n.selectedAttachment),t=new wp.media.model.Selection(a,{multiple:!1}),(o=n.mapModelToMediaFrameProps(n.model.toJSON())).size&&n.displaySettings.set("size",o.size),d=new w.MediaFrameSelect({title:n.l10n.add_media,frame:"post",text:n.l10n.add_to_widget,selection:t,mimeType:n.mime_type,selectedDisplaySettings:n.displaySettings,showDisplaySettings:n.showDisplaySettings,metadata:o,state:n.isSelected()&&0===n.model.get("attachment_id")?"embed":"insert",invalidEmbedTypeError:n.l10n.unsupported_file_type}),(wp.media.frame=d).on("insert",function e(){var t={},i=d.state();"embed"===i.get("id")?_.extend(t,{id:0},i.props.toJSON()):_.extend(t,i.get("selection").first().toJSON()),n.selectedAttachment.set(t),n.model.set("error",!1),n.model.set(n.getModelPropsFromMediaFrame(d))}),i=wp.media.model.Attachment.prototype.sync,wp.media.model.Attachment.prototype.sync=function(e){return"delete"===e?i.apply(this,arguments):u.Deferred().rejectWith(this).promise()},d.on("close",function e(){wp.media.model.Attachment.prototype.sync=i}),d.$el.addClass("media-widget"),d.open(),t&&t.on("destroy",function e(t){n.model.get("attachment_id")===t.get("id")&&n.model.set({attachment_id:0,url:""})}),d.$el.find(".media-frame-menu .media-menu-item.active").focus()},getModelPropsFromMediaFrame:function e(t){var i=this,n,d,o;if("insert"===(n=t.state()).get("id"))(d=n.get("selection").first().toJSON()).postUrl=d.link,i.showDisplaySettings&&_.extend(d,t.content.get(".attachments-browser").sidebar.get("display").model.toJSON()),d.sizes&&d.size&&d.sizes[d.size]&&(d.url=d.sizes[d.size].url);else{if("embed"!==n.get("id"))throw new Error("Unexpected state: "+n.get("id"));d=_.extend(n.props.toJSON(),{attachment_id:0},i.model.getEmbedResetProps())}return d.id&&(d.attachment_id=d.id),o=i.mapMediaToModelProps(d),_.each(wp.media.view.settings.embedExts,function(e){e in i.model.schema&&o.url!==o[e]&&(o[e]="")}),o},mapMediaToModelProps:function e(t){var n=this,d={},o={},i;return _.each(n.model.schema,function(e,t){"title"!==t&&(d[e.media_prop||t]=t)}),_.each(t,function(e,t){var i=d[t]||t;n.model.schema[i]&&(o[i]=e)}),"custom"===t.size&&(o.width=t.customWidth,o.height=t.customHeight),"post"===t.link?o.link_url=t.postUrl||t.linkUrl:"file"===t.link&&(o.link_url=t.url),!t.attachment_id&&t.id&&(o.attachment_id=t.id),t.url&&(i=t.url.replace(/#.*$/,"").replace(/\?.*$/,"").split(".").pop().toLowerCase())in n.model.schema&&(o[i]=t.url),_.omit(o,"title")},mapModelToMediaFrameProps:function e(t){var n=this,d={};return _.each(t,function(e,t){var i=n.model.schema[t]||{};d[i.media_prop||t]=e}),d.attachment_id=d.id,"custom"===d.size&&(d.customWidth=n.model.get("width"),d.customHeight=n.model.get("height")),d},mapModelToPreviewTemplateProps:function e(){var i=this,n={};return _.each(i.model.schema,function(e,t){e.hasOwnProperty("should_preview_update")&&!e.should_preview_update||(n[t]=i.model.get(t))}),n.error=i.model.get("error"),n},editMedia:function e(){throw new Error("editMedia not implemented")}}),w.MediaWidgetModel=Backbone.Model.extend({idAttribute:"widget_id",schema:{title:{type:"string",default:""},attachment_id:{type:"integer",default:0},url:{type:"string",default:""}},defaults:function(){var i={};return _.each(this.schema,function(e,t){i[t]=e.default}),i},set:function e(t,i,n){var d=this,o,a,r;return null===t?d:(a="object"==typeof t?(o=t,i):((o={})[t]=i,n),r={},_.each(o,function(e,t){var i;d.schema[t]?"array"===(i=d.schema[t].type)?(r[t]=e,_.isArray(r[t])||(r[t]=r[t].split(/,/)),d.schema[t].items&&"integer"===d.schema[t].items.type&&(r[t]=_.filter(_.map(r[t],function(e){return parseInt(e,10)},function(e){return"number"==typeof e})))):r[t]="integer"===i?parseInt(e,10):"boolean"===i?!(!e||"0"===e||"false"===e):e:r[t]=e}),Backbone.Model.prototype.set.call(this,r,a))},getEmbedResetProps:function e(){return{id:0}}}),w.modelCollection=new(Backbone.Collection.extend({model:w.MediaWidgetModel})),w.widgetControls={},w.handleWidgetAdded=function e(t,i){var n,d,o,a,r,s,l,c,m,p,h=50,g;a=(o=i.find("> .widget-inside > .form, > .widget-inside > form")).find("> .id_base").val(),p=o.find("> .widget-id").val(),w.widgetControls[p]||(r=w.controlConstructors[a])&&(s=w.modelConstructors[a]||w.MediaWidgetModel,n=u("<div></div>"),(d=i.find(".widget-content:first")).before(n),l={},d.find(".media-widget-instance-property").each(function(){var e=u(this);l[e.data("property")]=e.val()}),l.widget_id=p,m=new s(l),c=new r({el:n,syncContainer:d,model:m}),(g=function(){i.hasClass("open")?c.render():setTimeout(g,50)})(),w.modelCollection.add([m]),w.widgetControls[m.get("widget_id")]=c)},w.setupAccessibleMode=function e(){var t,i,n,d,o,a,r,s,l;0!==(t=u(".editwidget > form")).length&&(n=t.find("> .widget-control-actions > .id_base").val(),(o=w.controlConstructors[n])&&(i=t.find("> .widget-control-actions > .widget-id").val(),a=w.modelConstructors[n]||w.MediaWidgetModel,s=u("<div></div>"),(l=t.find("> .widget-inside")).before(s),r={},l.find(".media-widget-instance-property").each(function(){var e=u(this);r[e.data("property")]=e.val()}),r.widget_id=i,d=new o({el:s,syncContainer:l,model:new a(r)}),w.modelCollection.add([d.model]),(w.widgetControls[d.model.get("widget_id")]=d).render()))},w.handleWidgetUpdated=function e(t,i){var n,d,o,a,r={};o=(n=i.find("> .widget-inside > .form, > .widget-inside > form")).find("> .widget-id").val(),(a=w.widgetControls[o])&&((d=n.find("> .widget-content")).find(".media-widget-instance-property").each(function(){var e=u(this).data("property");r[e]=u(this).val()}),a.stopListening(a.model,"change",a.syncModelToInputs),a.model.set(r),a.listenTo(a.model,"change",a.syncModelToInputs))},w.init=function e(){var t=u(document);t.on("widget-added",w.handleWidgetAdded),t.on("widget-synced widget-updated",w.handleWidgetUpdated),u(function e(){var t;"widgets"===window.pagenow&&((t=u(".widgets-holder-wrap:not(#available-widgets)").find("div.widget")).one("click.toggle-widget-expanded",function e(){var t=u(this);w.handleWidgetAdded(new jQuery.Event("widget-added"),t)}),u(window).on("load",function(){w.setupAccessibleMode()}))})},w}(jQuery);