/*
 * Paginação costumada
 *
 * Dependências: Jquery, SCSS de mesmo nome, font-awesome
 *
 * Ultima atualização
 *
 * Data: 12/11/2019
 * Por: Lucas Paranhos
 * Atualizações: Método de destruir
 */

$(function () {
    carregarPaginacaoManualmente();
});

function carregarPaginacaoManualmente() {

    //A div que conterá as abas dentro deverá ter a classe paginacaoCustom
    var $containerPaginas = $('.paginacaoCustom');

    //Percorre todas as paginações atrás de instanciar todas.
    $containerPaginas.each(function (i, element) {
        var $element = $(element);

        /*
         * Atributo opcional para paginacaoCustom: data-debug
         * Define se serão exibidos log dos erros no console
         * para ele exibir deverá o valor true
         */

        var debugMode = false;

        if ($element.data('debug') == true) {
            debugMode = true;
        }

        //Verifica se o elemento já foi instanciado, caso sim, pula para um próximo

        if ($element.data('instanciado') == true) {

            if (debugMode) {
                console.log('Elemento já instanciado ' + $element.attr('referencia'))
            }

            return true;
        }

        /*
         * O elemento deverá ter um atributo data-referencia
         * tanto na paginação quanto nos controles, para que se haja
         * mais de um por página eles funcionem corretamente
         */

        var referencia = $element.data('referencia');
        var seletor = '[data-referencia="' + referencia + '"]';

        /*
         * A div que conterá os controles (bolinhas) deve ter a classe controlesPaginacaoCustom,
         * os controles serão colocadas automaticamente
         * ela também deverá ter o seletor data-referencia, para podermos saber a quem ela controla
         */

        var $paginacaoReferente = $('.controlesPaginacaoCustom' + seletor);

        if ($paginacaoReferente.length == 0) {

            if (debugMode) {
                console.log('não foi encontrado um elemento de paginação para o seletor ' + seletor);
            }

            //Esconde o elemento paginável
            $element.hide();

            //Segue para o próximo item da lista
            return true;
        }

        /*
         * Para sabermos quantos elementos deveram ter por pagina deveremos colocar o atributo
         * data-itens que é um valor numérico no elemento paginacaoCustom
         * esse valor não pode ser 0, e se for deixado em branco ou tiver um valor inválido será considerado 10
         */

        var elementosPorPagina = $element.data('itens');

        if (!$.isNumeric(elementosPorPagina) || elementosPorPagina == 0) {
            elementosPorPagina = 10;
        }

        /*
         * Os elementos que deveram ser considerados para paginação deveram conter a classe
         * elementoPaginavel, esses elementos serão separados automaticamente
         */

        var $elementos = $element.find('.elementoPaginavel');

        if ($elementos.length == 0) {

            /*
             * Atributo opcional para paginacaoCustom: data-msgErro
             * controla se há uma mensagem de erro caso não haja elementos
             * para ele exibir deverá receber uma mensagem
             */

            var msgErro = $paginacaoReferente.data('msgErro');

            if (msgErro != "" && msgErro != null && msgErro != undefined) {

                var erro = "<p class='msgErroPaginacao'>" + msgErro + "</p>";

                $element.append(erro);
                $paginacaoReferente.hide();

            } else {

                if (debugMode) {
                    console.log('não há elementos para paginar em ' + referencia);
                }


                //Esconde o elemento paginável
                $element.hide();
                $paginacaoReferente.hide();

                return true;

            }

        }

        // Calcula o número de páginas

        var totalDePaginas = Math.ceil($elementos.length / elementosPorPagina);

        /*
         * Atributo opcional para controlesPaginacaoCustom: data-mostrar_unica
         * controla se a paginação será exibida em caso de uma única aba
         * para ele exibir deverá receber o valor true
         */

        var deveraExibir = true;

        if (totalDePaginas == 1) {

            if (!$paginacaoReferente.data('mostrar_unica') == true) {
                deveraExibir = false;
            }

        } else if (totalDePaginas == 0) {

            deveraExibir = false;

        }


        /*
         * Coloca os itens da paginação no DOM
         */

        if (deveraExibir) {
            var itemPaginacao = "<div class='responsivePagination'>"
            for (x = 1; x <= totalDePaginas; x++) {

                //seletor de página
                itemPaginacao += "<li class='page-item'>" +
                    "   <a class='page-link " + (x == 1 ? 'selected' : '') + "' data-href='.pagina-" + referencia + "-" + x + "' ></a>" +
                    "</li >";

                //Adiciona o item a paginação

            }
            itemPaginacao += "</div>"
            $paginacaoReferente.append(itemPaginacao);
        }

        /*
         * Atributo opcional para controlesPaginacaoCustom: data-setas
         * habilita o controle por meio de deus setas laterais
         * para ativar deverá receber o valor true
         */

        if ($element.data('setas') == true) {

            if (deveraExibir) {

                var anterior = "" +
                    "<li class='page-item ant-prox text-right'>" +
                    "   <a class='page-link ant-prox' data-href='prev' aria-label='<'>" +
                    "        <span aria-hidden='true' ><i class='fa fa-angle-left'></i></span>" +
                    "    </a>" +
                    "</li>";

                var primeiro = "" +
                    "<li class='page-item ant-prox text-right paginacaoDupla'>" +
                    "   <a class='page-link ant-prox primeiro' data-href='primeiro' aria-label='<'>" +
                    "        <span aria-hidden='true' ><i class='fa fa-angle-double-left'></i></span>" +
                    "    </a>" +
                    "</li>";


                var proximo = "" +
                    "<li class='page-item ant-prox text-left'>" +
                    "   <a class='page-link ant-prox' data-href='next' aria-label='>'>" +
                    "        <span aria-hidden='true' ><i class='fa fa-angle-right'></i></span>" +
                    "    </a>" +
                    "</li>";

                var ultimo = "" +
                    "<li class='page-item ant-prox text-left paginacaoDupla'>" +
                    "   <a class='page-link ant-prox ultimo' data-href='ultimo' aria-label='>'>" +
                    "        <span aria-hidden='true' ><i class='fa fa-angle-double-right'></i></span>" +
                    "    </a>" +
                    "</li>";

                //Adiciona o item a paginação
                $paginacaoReferente.append(proximo);
                $paginacaoReferente.append(ultimo);
                $paginacaoReferente.prepend(anterior);
                $paginacaoReferente.prepend(primeiro);

                /*
                 * Verifica se as setas de paginação duplas são necessárias
                 */
                $lista = $paginacaoReferente.find('.responsivePagination');

                //Pega o tamanho da div
                tamanhoDivPaginacao = $lista.width();

                //Pega a largura de um filho e multiplica pela quantidade de filhos e subtrai o tamanho das setas duplas
                tamanhoElementosDentro = $lista.children().length * $lista.find(':not(.selected)').outerWidth() - $paginacaoReferente.find('.paginacaoDupla').outerWidth() * 2;

                //Verifica se é possível esconder as paginações
                if (Math.ceil(tamanhoDivPaginacao) >= Math.ceil(tamanhoElementosDentro)) {
                    $paginacaoReferente.find('.paginacaoDupla').hide();
                }

            }
        }


        /*
         * Separa os elementos da paginacaoCustom em divs para controlar a visibilidade
         */

        var conteudoPaginacao = "";

        for (y = 1; y <= totalDePaginas; y++) {

            /*
             * Pega uma "fatia" do array, do elemento de index 0, até o elemento do index definido - 1 
             * (para se adequar as divisões coronariogramas de arrays (começas na posição 0))
             */

            var $elementosDaPagina = $elementos.slice((y - 1) * elementosPorPagina, (y * elementosPorPagina));
            if (y == 1) {
                $elementosDaPagina = $elementos.slice(0, (y + 1 * elementosPorPagina) - 1);
            } else if (y == totalDePaginas) {
                $elementosDaPagina = $elementos.slice((y - 1) * elementosPorPagina);
            }


            //Cria a div que vai conter o conteúdo
            conteudoPaginacao += "<div class='pagina-paginacao pagina-" + referencia + "-" + y + " " + (y == 1 ? '' : 'hidden hide') + " '>";

            $elementosDaPagina.each(function (index, conteudoPaginavel) {
                var $conteudoPaginavel = $(conteudoPaginavel);

                //Adiciona as divs que antes estavam paginacaoCustom para dentro da div de paginação.
                conteudoPaginacao += $conteudoPaginavel.prop('outerHTML');
            });

            conteudoPaginacao += "</div>";

        }

        $element.html(conteudoPaginacao);


        /*
         * Atributo opcional para controlesPaginacaoCustom: data-desligaArrasto
         * desabilita a função de clicar e arrastar pra mudar o slide
         * para desativar deverá receber o valor true
         */

        if ($element.data('desligaArrasto') != true) {
            /*Código que peguei na internet fonte: https://pt.stackoverflow.com/questions/361698/como-poderia-implementar-um-swipe-para-essa-biblioteca-de-slide/364799#364799*/
            var start_client_x = null, start_client_y = null;
            var current_client_x = null, current_client_y = null;

            $(document).on("touchstart touchend", '.paginacaoCustom' + seletor + ' .pagina-paginacao', function (e) {

                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

                if (e.type == 'touchstart') {
                    //has_permission_swipe = false;
                    start_client_x = null;
                    start_client_y = null;
                    start_client_x = parseInt(touch.clientX);
                    start_client_y = parseInt(touch.clientY);

                }

                if (e.type == 'touchend') {

                    e.stopImmediatePropagation();

                    //current_page = e.pageX;
                    current_client_x = parseInt(touch.clientX);
                    current_client_y = parseInt(touch.clientY);

                    if (!start_client_x) {
                        return;
                    }

                    var xDiff = parseInt(parseInt(start_client_x) - parseInt(current_client_x));
                    var yDiff = parseInt(parseInt(start_client_y) - parseInt(current_client_y));

                    if (Math.abs(xDiff) < Math.abs(yDiff) || Math.abs(xDiff) < 10) {
                        return;
                    }

                    var meia_tela = parseInt(window.innerWidth / 2);

                    if (start_client_x != null) {

                        start_client_x = null;
                        start_client_y = null;
                        current_client_x = null;
                        current_client_y = null;

                        if (xDiff < 0 || (meia_tela < parseInt(current_client_x) && xDiff < meia_tela)) {
                            /* left swipe */

                            var btn = $(".controlesPaginacaoCustom" + seletor + " [data-href='prev']").trigger('click');
                        } else {

                            /* right swipe */
                            var btn = $(".controlesPaginacaoCustom" + seletor + " [data-href='next']").trigger('click');
                        }
                    }

                }

            });

        }


        //finaliza a instanciação bloqueando que novas aconteçam
        $element.data('instanciado', 'true');
    });

    //Método que efetivamente muda de página
    $(document).off('click touch', '.page-link').on('click touch', '.page-link', function (evt) {

        /*
         * Seleciona o elemento da paginação que foi pressionado
         */

        var $element = $(evt.target).closest('.page-link');

        /*
         * Seleciona a div da paginação do elemento que foi pressionado
         */

        var $paginacao = $element.closest('.controlesPaginacaoCustom')

        /*
         * Retira a classe selected de todos os elementos da div
         */

        $paginaSelecionada = $paginacao.find(".page-link.selected")

        $paginaSelecionada.removeClass('selected');

        /*
         * Esconde todas as páginas da div paginacaoCustom referente
         */

        var referencia = $paginacao.data('referencia');
        var seletor = '[data-referencia="' + referencia + '"]';
        var $paginacaoReferente = $('.paginacaoCustom' + seletor);

        $paginaReferenciada = $paginacaoReferente.find('.pagina-paginacao').not('.hidden');

        $paginaReferenciada.addClass('hide');

        setTimeout(function () {
            $paginaReferenciada.addClass('hidden');
        }, 175);


        /*
         * Torna visível a página selecionada
         */

        var classeParaAtivar = $element.data('href');

        if (!["next", "ultimo", "prev", "primeiro"].includes(classeParaAtivar)) {
            setTimeout(function () {
                $(classeParaAtivar).removeClass('hidden');
                setTimeout(function () {
                    $(classeParaAtivar).removeClass('hide');

                    $object = $(classeParaAtivar).find('.elementoPaginavel');
                    var data_target_action = $object.data('target-action');
                    var data_target_class_add = $object.data('target-class-add');
                    var data_target_class_rmv = $object.data('target-class-rmv');

                    if (data_target_action != "" && (data_target_class_add != "" || data_target_class_rmv != "")) {
                        $(data_target_action).addClass(data_target_class_add);
                        $(data_target_action).removeClass(data_target_class_rmv);
                    }

                }, 25);
            }, 175);
            /*
             * Adiciona a classe selected a paginação selecionada
             */

            $element.addClass('selected');

        } else {


            /*
             * Verifica o caminho que deverá ser tomado (próximo ou anterior)
             */

            switch (classeParaAtivar) {
                case "next":
                    $tgt = $paginaSelecionada.parent().next().children();
                    break;
                case "ultimo":
                    $tgt = $($paginaSelecionada.parents()[1].lastChild).children();
                    break;
                case "prev":
                    $tgt = $paginaSelecionada.parent().prev().children();
                    break;
                case "primeiro":
                    $tgt = $($paginaSelecionada.parents()[1].firstChild).children();
                    break;
                default:
                    break;
            };

            /*
             * Atributo opcional para paginacaoCustom: data-carrossel
             * controla se ao chegar no final ele voltará ao inicio
             * para ele exibir deverá receber o valor true
             */

            if ($paginacao.data('carrossel') == true) {
                if ($tgt.length == 0) {
                    if (classeParaAtivar == "next") {
                        $tgt = $($paginaSelecionada.parents()[1].firstChild).children();
                    } else if (classeParaAtivar == "prev") {
                        $tgt = $($paginaSelecionada.parents()[1].lastChild).children();
                    }
                }
            }


            //Caso o objeto venha vazio permanece na mesma página

            if ($tgt.length == 0) {

                classeParaAtivar = $paginaSelecionada.data('href');


                setTimeout(function () {
                    $(classeParaAtivar).removeClass('hidden');

                    setTimeout(function () {
                        $(classeParaAtivar).removeClass('hide');


                        $object = $(classeParaAtivar).find('.elementoPaginavel');
                        var data_target_action = $object.data('target-action');
                        var data_target_class_add = $object.data('target-class-add');
                        var data_target_class_rmv = $object.data('target-class-rmv');

                        if (data_target_action != "" && (data_target_class_add != "" || data_target_class_rmv != "")) {
                            $(data_target_action).addClass(data_target_class_add);
                            $(data_target_action).removeClass(data_target_class_rmv);
                        }
                    }, 25);
                }, 175);

                /*
                 * Adiciona a classe selected a paginação selecionada
                 */

                $paginaSelecionada.addClass('selected');

            } else {

                /*
                 * Move o scroll da div para o lado caso esteja em modo responsivo;
                 */

                var meio = $(window).outerWidth() / 2;

                $divScroll = $($tgt.parents()[1]);

                deveMoverScroll = $tgt.offset().left - meio;

                $divScroll.scrollLeft($divScroll.scrollLeft() + deveMoverScroll);

                /*
                 * Aciona a div referente
                 */

                classeParaAtivar = $tgt.data('href');


                setTimeout(function () {
                    $(classeParaAtivar).removeClass('hidden');
                    setTimeout(function () {
                        $(classeParaAtivar).removeClass('hide');

                        $object = $(classeParaAtivar).find('.elementoPaginavel');
                        var data_target_action = $object.data('target-action');
                        var data_target_class_add = $object.data('target-class-add');
                        var data_target_class_rmv = $object.data('target-class-rmv');

                        if (data_target_action != "" && (data_target_class_add != "" || data_target_class_rmv != "")) {
                            $(data_target_action).addClass(data_target_class_add);
                            $(data_target_action).removeClass(data_target_class_rmv);
                        }
                    }, 25);
                }, 175);

                /*
                 * Adiciona a classe selected a paginação selecionada
                 */

                $tgt.addClass('selected');

            }

        }

        /*
         * Atributo opcional para controlesPaginacaoCustom: data-animate
         * caso seja true fará a animação subindo a página até depois do header
         */

        if ($paginacaoReferente.data('animate') == true) {
            $("html, body").animate({ scrollTop: $("header").height() - $("nav").height() }, "slow");
        }
    });
}

/*
 * Destrói a paginação
 * Recebe a div com a classe paginacaoCustom que será formatada para antes de sua instancia
 */

function destruirPaginacao($containerPaginacao) {
    
    //Verifica se o elemento é válido, para poder prosseguir com o método
    
    if ($containerPaginacao == null || $containerPaginacao.length == 0) {
        //Nesse caso o elemento não é uma instancia JavaScript, e por isso retorna um erro

        console.log('o elemento passado não é válido');
        return false;

    } else if ($containerPaginacao.length > 1) {
        //Nesse caso existe mais de um elemento, e o método só lida com um.
        
        console.log('o elemento passado representa mais de um objeto');
        return false;
    }
    else if (!$containerPaginacao.hasClass('paginacaoCustom')) {
        //Nesse caso verificamos se o elemento é uma paginação válida, se ele não possuir a classe ele não pode ser destruído
        
        console.log('o elemento passado não se enquadra no padrão do plug-in');
        return false;

    } else if ($containerPaginacao.data('instanciado') == "false") {
        //Nesse caso o elemento não está instanciado ainda, então não necessita ser destruído
        
        console.log('o elemento passado já não está instanciado');
        return false;

    }

    //Caso nenhum desses métodos tenha resultado em uma return false, segue para o resto da função


    //Busca através do atributo data-referencia a paginação referente ao container passado como parâmetro

    var referencia = $containerPaginacao.data('referencia');
    var seletor = '[data-referencia="' + referencia + '"]';

    //Busca a paginação referente para poder garantir que ela estará vazia após a formatação

    var $paginacaoReferente = $('.controlesPaginacaoCustom' + seletor);

    //Limpa o container da paginação
    $paginacaoReferente.html("");

    //Percorre cada elemento com a classe pagina-paginacao e salva todos os seus dados em uma variável

    var $paginas = $containerPaginacao.find('.pagina-paginacao');
    var elementosPaginaveis = "";

    $paginas.each(function (index, element) {
        elementosPaginaveis += $(element).html();
    });

    //Coloca o conteúdo de volta na div pai

    $containerPaginacao.html(elementosPaginaveis);

    //Transforma a propriedade que diz que o elemento foi instanciado em falsa
    $containerPaginacao.data('instanciado', 'false');

    //Retorna que o método teve sucesso em sua execução
    return true;

}