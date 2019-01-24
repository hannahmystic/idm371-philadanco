wp.customHtmlWidgets=function(g){"use strict";var u={idBases:["custom_html"],codeEditorSettings:{},l10n:{errorNotice:{singular:"",plural:""}}};return u.CustomHtmlWidgetControl=Backbone.View.extend({events:{},initialize:function e(t){var o=this;if(!t.el)throw new Error("Missing options.el");if(!t.syncContainer)throw new Error("Missing options.syncContainer");Backbone.View.prototype.initialize.call(o,t),o.syncContainer=t.syncContainer,o.widgetIdBase=o.syncContainer.parent().find(".id_base").val(),o.widgetNumber=o.syncContainer.parent().find(".widget_number").val(),o.customizeSettingId="widget_"+o.widgetIdBase+"["+String(o.widgetNumber)+"]",o.$el.addClass("custom-html-widget-fields"),o.$el.html(wp.template("widget-custom-html-control-fields")({codeEditorDisabled:u.codeEditorSettings.disabled})),o.errorNoticeContainer=o.$el.find(".code-editor-error-container"),o.currentErrorAnnotations=[],o.saveButton=o.syncContainer.add(o.syncContainer.parent().find(".widget-control-actions")).find(".widget-control-save, #savewidget"),o.saveButton.addClass("custom-html-widget-save-button"),o.fields={title:o.$el.find(".title"),content:o.$el.find(".content")},_.each(o.fields,function(i,n){i.on("input change",function e(){var t=o.syncContainer.find(".sync-input."+n);t.val()!==i.val()&&(t.val(i.val()),t.trigger("change"))}),i.val(o.syncContainer.find(".sync-input."+n).val())})},updateFields:function e(){var t=this,i;t.fields.title.is(document.activeElement)||(i=t.syncContainer.find(".sync-input.title"),t.fields.title.val(i.val())),t.contentUpdateBypassed=t.fields.content.is(document.activeElement)||t.editor&&t.editor.codemirror.state.focused||0!==t.currentErrorAnnotations,t.contentUpdateBypassed||(i=t.syncContainer.find(".sync-input.content"),t.fields.content.val(i.val()).trigger("change"))},updateErrorNotice:function(e){var t=this,i,n="",o;1===e.length?n=u.l10n.errorNotice.singular.replace("%d","1"):1<e.length&&(n=u.l10n.errorNotice.plural.replace("%d",String(e.length))),t.fields.content[0].setCustomValidity&&t.fields.content[0].setCustomValidity(n),wp.customize&&wp.customize.has(t.customizeSettingId)?((o=wp.customize(t.customizeSettingId)).notifications.remove("htmlhint_error"),0!==e.length&&o.notifications.add("htmlhint_error",new wp.customize.Notification("htmlhint_error",{message:n,type:"error"}))):0!==e.length?((i=g('<div class="inline notice notice-error notice-alt"></div>')).append(g("<p></p>",{text:n})),t.errorNoticeContainer.empty(),t.errorNoticeContainer.append(i),t.errorNoticeContainer.slideDown("fast"),wp.a11y.speak(n)):t.errorNoticeContainer.slideUp("fast")},initializeEditor:function e(){var i=this,t;u.codeEditorSettings.disabled||(t=_.extend({},u.codeEditorSettings,{onTabPrevious:function e(){i.fields.title.focus()},onTabNext:function e(){var t;i.syncContainer.add(i.syncContainer.parent().find(".widget-position, .widget-control-actions")).find(":tabbable").first().focus()},onChangeLintingErrors:function e(t){i.currentErrorAnnotations=t},onUpdateErrorNotice:function e(t){i.saveButton.toggleClass("validation-blocked disabled",0<t.length),i.updateErrorNotice(t)}}),i.editor=wp.codeEditor.initialize(i.fields.content,t),g(i.editor.codemirror.display.lineDiv).attr({role:"textbox","aria-multiline":"true","aria-labelledby":i.fields.content[0].id+"-label","aria-describedby":"editor-keyboard-trap-help-1 editor-keyboard-trap-help-2 editor-keyboard-trap-help-3 editor-keyboard-trap-help-4"}),g("#"+i.fields.content[0].id+"-label").on("click",function(){i.editor.codemirror.focus()}),i.fields.content.on("change",function(){this.value!==i.editor.codemirror.getValue()&&i.editor.codemirror.setValue(this.value)}),i.editor.codemirror.on("change",function(){var e=i.editor.codemirror.getValue();e!==i.fields.content.val()&&i.fields.content.val(e).trigger("change")}),i.editor.codemirror.on("blur",function(){i.contentUpdateBypassed&&i.syncContainer.find(".sync-input.content").trigger("change")}),wp.customize&&i.editor.codemirror.on("keydown",function e(t,i){var n;27===i.keyCode&&i.stopPropagation()}))}}),u.widgetControls={},u.handleWidgetAdded=function e(t,i){var n,o,d,r,a=50,s,l,c;o=(n=i.find("> .widget-inside > .form, > .widget-inside > form")).find("> .id_base").val(),-1!==u.idBases.indexOf(o)&&(r=n.find(".widget-id").val(),u.widgetControls[r]||(l=g("<div></div>"),(c=i.find(".widget-content:first")).before(l),d=new u.CustomHtmlWidgetControl({el:l,syncContainer:c}),u.widgetControls[r]=d,(s=function(){(wp.customize?i.parent().hasClass("expanded"):i.hasClass("open"))?d.initializeEditor():setTimeout(s,a)})()))},u.setupAccessibleMode=function e(){var t,i,n,o,d;0!==(t=g(".editwidget > form")).length&&(i=t.find("> .widget-control-actions > .id_base").val(),-1!==u.idBases.indexOf(i)&&(o=g("<div></div>"),(d=t.find("> .widget-inside")).before(o),(n=new u.CustomHtmlWidgetControl({el:o,syncContainer:d})).initializeEditor()))},u.handleWidgetUpdated=function e(t,i){var n,o,d,r;r=(n=i.find("> .widget-inside > .form, > .widget-inside > form")).find("> .id_base").val(),-1!==u.idBases.indexOf(r)&&(o=n.find("> .widget-id").val(),(d=u.widgetControls[o])&&d.updateFields())},u.init=function e(t){var i=g(document);_.extend(u.codeEditorSettings,t),i.on("widget-added",u.handleWidgetAdded),i.on("widget-synced widget-updated",u.handleWidgetUpdated),g(function e(){var t;"widgets"===window.pagenow&&((t=g(".widgets-holder-wrap:not(#available-widgets)").find("div.widget")).one("click.toggle-widget-expanded",function e(){var t=g(this);u.handleWidgetAdded(new jQuery.Event("widget-added"),t)}),g(window).on("load",function(){u.setupAccessibleMode()}))})},u}(jQuery);