jQuery(document).ready(function(p){p("#the-list").on("click",".delete-tag",function(){var e=p(this),t=e.parents("tr"),a=!0,n;return"undefined"!=showNotice&&(a=showNotice.warn()),a&&(n=e.attr("href").replace(/[^?]*\?/,"").replace(/action=delete/,"action=delete-tag"),p.post(ajaxurl,n,function(e){"1"==e?(p("#ajax-response").empty(),t.fadeOut("normal",function(){t.remove()}),p('select#parent option[value="'+n.match(/tag_ID=(\d+)/)[1]+'"]').remove(),p("a.tag-link-"+n.match(/tag_ID=(\d+)/)[1]).remove()):("-1"==e?p("#ajax-response").empty().append('<div class="error"><p>'+tagsl10n.noPerm+"</p></div>"):p("#ajax-response").empty().append('<div class="error"><p>'+tagsl10n.broken+"</p></div>"),t.children().css("backgroundColor",""))}),t.children().css("backgroundColor","#f33")),!1}),p("#edittag").on("click",".delete",function(e){if("undefined"==typeof showNotice)return!0;var t;showNotice.warn()||e.preventDefault()}),p("#submit").click(function(){var o=p(this).parents("form");return validateForm(o)&&p.post(ajaxurl,p("#addtag").serialize(),function(e){var t,a,n,r,s;if(p("#ajax-response").empty(),(t=wpAjax.parseAjaxResponse(e,"ajax-response"))&&!t.errors){if(0<(a=o.find("select#parent").val())&&0<p("#tag-"+a).length?p(".tags #tag-"+a).after(t.responses[0].supplemental.noparents):p(".tags").prepend(t.responses[0].supplemental.parents),p(".tags .no-items").remove(),o.find("select#parent")){for(n=t.responses[1].supplemental,r="",s=0;s<t.responses[1].position;s++)r+="&nbsp;&nbsp;&nbsp;";o.find("select#parent option:selected").after('<option value="'+n.term_id+'">'+r+n.name+"</option>")}p('input[type="text"]:visible, textarea:visible',o).val("")}}),!1})});