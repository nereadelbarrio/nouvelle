(function (blink) {
	'use strict';

	var nouvelleStyle = function () {
			blink.theme.styles.basic.apply(this, arguments);
		},
		page = blink.currentPage;

	nouvelleStyle.prototype = {
		//BK-15873 añadimos el estilo basic como parent para la herencia de los estilos del CKEditor
		parent: blink.theme.styles.basic.prototype,
		bodyClassName: 'content_type_clase_nouvelle',
		ckEditorStyles: {
			name: 'nouvelle',
			styles: [

				{ name: 'Título 1', element: 'h4', attributes: { 'class': 'bck-title bck-title1'} },
				{ name: 'Título 2', element: 'h4', attributes: { 'class': 'bck-title bck-title2'} },
				
				{ name: 'Énfasis letras rojas', element: 'span', attributes: { 'class': 'bck-enfasis-1'} },
				{ name: 'Énfasis rojo', element: 'span', attributes: { 'class': 'bck-enfasis-2'} },
				{ name: 'Énfasis azul', element: 'span', attributes: { 'class': 'bck-enfasis-3'} },
				{ name: 'Énfasis RobotoSlab', element: 'span', attributes: { 'class': 'bck-enfasis-4'} },
				{ name: 'Énfasis FontEjemplos', element: 'span', attributes: { 'class': 'bck-enfasis-5'} },
				{ name: 'Énfasis letras azules', element: 'span', attributes: { 'class': 'bck-enfasis-6'} },
				{ name: 'Énfasis letras moradas', element: 'span', attributes: { 'class': 'bck-enfasis-7'} },
				{ name: 'Énfasis letras verde', element: 'span', attributes: { 'class': 'bck-enfasis-8'} },

				{ name: 'Lista ordenada 1', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-1' } },
				{ name: 'Lista ordenada 2', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-2' } },
				{ name: 'Lista ordenada 3', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-3' } },
				{ name: 'Lista ordenada 4', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-4' } },
				{ name: 'Lista ordenada 5', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-5' } },
				{ name: 'Lista ordenada 6', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-6' } },
				{ name: 'Lista ordenada 7', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-7' } },
				{ name: 'Lista ordenada 8', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-8' } },
				{ name: 'Lista ordenada 9', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-9' } },

				{ name: 'Caja Observez', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-1' } },
				{ name: 'Caja grammaire', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-2' } },
				{ name: 'Caja 3', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-3' } },
				{ name: 'Caja 4 simple', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-4' } },
				{ name: 'Caja 5 simple', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-5' } },
				{ name: 'Caja 6 simple', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-6' } },
				{ name: 'Caja 7 simple', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-7' } },
				{ name: 'Caja 8 simple', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-8' } },
				{ name: 'Caja je mémorise', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-9' } },
				{ name: 'Caja dire', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-10' } },

				{ name: 'Tabla roja', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'bck-table-2'} },

				{ name: 'Celda roja', element: 'td', attributes: { 'class': 'bck-td-2'} }
			]
		},

		init: function (scope) {
			var that = scope || this;
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.init.call(that);
			that.addActivityTitle();
			if(window.esWeb) return;
			that.removeFinalSlide();
			that.handleScrollEnd();
			that.setTooltip();
			window.editar && that.configEditor();

			if ($('.navbar-bottom').length > 0) {
 				$('.navbar-bottom ol').wrapAll('<div id="bottom-navigator"></div>');
		 		var width = 0;
		 		$('.navbar-bottom li').each(function(i, elem){ width += $(elem).outerWidth(true); });
		 		$('.navbar-bottom ol').css('width', width * 1.1);
		 		var scroll = new IScroll('#bottom-navigator', {
		 			scrollX: true,
		 			scrollY: false,
		 			eventPassthrough: true
		 		});
		 		scroll.on('scrollEnd', that.handleScrollEnd);
		 		that.handleScrollEnd.call(scroll);
	 		}

		},

		configEditor: function (editor) {
			editor.dtd.$removeEmpty['span'] = false;
		},


		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			$('.libro-left').find('.title').html(function () {
				return $(this).html().trim() + ' > ' + blink.courseInfo.unit;
			});
		},

		handleScrollEnd: function () {
 			$('#bottom-navigator')
 				.removeClass('show_left')
 				.removeClass('show_right');

 			if (this.x < 0) {
 				$('#bottom-navigator').addClass('show_left');
 			}
 			if (this.x > this.maxScrollX) {
 				$('#bottom-navigator').addClass('show_right');
 			}

 		},

		setTooltip: function () {},

		//BK-15873 Quitamos la funcion getEditorStyles para que la herede de basic
	};

	nouvelleStyle.prototype = _.extend({}, new blink.theme.styles.basic(), nouvelleStyle.prototype);

	blink.theme.styles.nouvelle = nouvelleStyle;

})( blink );
