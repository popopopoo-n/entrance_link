$(function () {
  //ハンバーガーメニューボタンがクリックされた時
  $('.btn-hamburger,.global-nav a').on('click', function () {
    if (window.matchMedia("(max-width: 767px)").matches) {
      //aria-expandedの値を変数 expanded に格納
      const expanded = $('.btn-hamburger').attr('aria-expanded'); // attr メソッド とは、HTML 要素の様々な属性の値を取得や変更ができるメソッドです。
      //メニューのDOMを$gnavに格納
      const $gnav = $('#gnav');

      //もし expanded が falseだったら（メニューが閉じていたら）
      if (expanded === 'false') {
        $('.btn-hamburger').attr('aria-expanded', true); //ハンバーガーメニューボタンのaria-expandedをtrueにする
        $gnav.attr('aria-hidden', false).slideDown(); //メニューのaria-hiddenを"false"に変更して表示する

        //もし expanded が trueだったら（メニューが開いていたら）
      } else {
        $('.btn-hamburger').attr('aria-expanded', false); //ハンバーガーメニューボタンのaria-expandedをfalseにする
        $gnav.attr('aria-hidden', true).slideUp(); //メニューのaria-hiddenを"ture"に変更して非表示にする
      }
    }
  });
});

// 波アニメーション

var unit = 100,
    canvasList, // キャンバスの配列
    info = {}, // 全キャンバス共通の描画情報
    colorList; // 各キャンバスの色情報

/**
 * Init function.
 * 
 * Initialize variables and begin the animation.
 */
function init() {
    info.seconds = 0;
    info.t = 0;
		canvasList = [];
    colorList = [];
    // canvas1個めの色指定
    canvasList.push(document.getElementById("waveCanvas"));
    colorList.push(['#f6fbf6']);
    
    // canvas2個めの色指定
    canvasList.push(document.getElementById("waveCanvas2"));
    colorList.push(['#fffffb']);

// 各キャンバスの初期化
　　for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
        canvas.height = 200;//波の高さ
        canvas.contextCache = canvas.getContext("2d");
    }
    // 共通の更新処理呼び出し
		update();
}

function update() {
		for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        // 各キャンバスの描画
        draw(canvas, colorList[canvasIndex]);
    }
    // 共通の描画情報の更新
    info.seconds = info.seconds + .014;
    info.t = info.seconds*Math.PI;
    // 自身の再起呼び出し
    setTimeout(update, 35);
}

/**
 * Draw animation function.
 * 
 * This function draws one frame of the animation, waits 20ms, and then calls
 * itself again.
 */
function draw(canvas, color) {
		// 対象のcanvasのコンテキストを取得
    var context = canvas.contextCache;
    // キャンバスの描画をクリア
    context.clearRect(0, 0, canvas.width, canvas.height);

    //波を描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
    drawWave(canvas, color[0], 1, 3, 0);
}

/**
* 波を描画
* drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawWave(canvas, color, alpha, zoom, delay) {
		var context = canvas.contextCache;
    context.fillStyle = color;//塗りの色
    context.globalAlpha = alpha;
    context.beginPath(); //パスの開始
    drawSine(canvas, info.t / 0.5, zoom, delay);
    context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
    context.lineTo(0, canvas.height); //パスをCanvasの左下へ
    context.closePath() //パスを閉じる
    context.fill(); //波を塗りつぶす
}

/**
 * Function to draw sine
 * 
 * The sine curve is drawn in 10px segments starting at the origin. 
 * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
 */
function drawSine(canvas, t, zoom, delay) {
    var xAxis = Math.floor(canvas.height/2);
    var yAxis = 0;
    var context = canvas.contextCache;
    // Set the initial x and y, starting at 0,0 and translating to the origin on
    // the canvas.
    var x = t; //時間を横の位置とする
    var y = Math.sin(x)/zoom;
    context.moveTo(yAxis, unit*y+xAxis); //スタート位置にパスを置く

    // Loop to draw segments (横幅の分、波を描画)
    for (i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t+(-yAxis+i)/unit/zoom;
        y = Math.sin(x - delay)/3;
        context.lineTo(i, unit*y+xAxis);
    }
}

init();

// slick-plan

$(function () {
function checkBreakPoint01() {
w = $(window).width();
if (w <= 479) {
  // スマホ向け（479px以下のとき）
    $(".slider").not('.slick-initialized').slick({
      dots: true,
      centerMode: true,
      centerPadding: '18px',
      focusOnSelect: true,
    });
} else {
  // PC向け
  $('.slider.slick-initialized').slick('unslick');
}
}
// ウインドウがリサイズする度にチェック
$(window).resize(function () {
  checkBreakPoint01();
});
// 初回チェック
checkBreakPoint01();
});


// slick-about

$(function () {
// function checkBreakPoint02() {
//   w = $(window).width();
//   if (w <= 479) {
//     // スマホ向け（479px以下のとき）
    $(".about-slider").not('.slick-initialized').slick({
      dots: true,
      centerMode: true,
      autoplay: true,
      autoplaySpeed: 1500,
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 479, // 479px以下のサイズに適用
          settings: {
            dots: true,
            centerMode:true,
            centerPadding:"20%",
            autoplay: true,
            autoplaySpeed: 1500,
            slidesToShow: 1,
          },
        },
      ],
    });
//   } else {
//     // PC向け
//     $('.about-slider.slick-initialized').slick('unslick');
//   }
// }
//   // ウインドウがリサイズする度にチェック
//   $(window).resize(function () {
//     checkBreakPoint02();
//   });
//   // 初回チェック
//   checkBreakPoint02();
});


// mv-image-change

function slideSwitch() {
var $active = $('.active');

if ( $active.length == 0 ) $active = $('.mv-image:last');

var $next =  $active.next().length ? $active.next()
   : $('.mv-image:first');

$active.addClass('last-active');

$next.css({opacity: 0.0})
   .addClass('active')
   .animate({opacity: 1.0}, 250, function() {
        $active.removeClass('active last-active');
   });
}

$(function() {
$('.mv').addClass('mv-animation');
setInterval( "slideSwitch()", 3500);
});


// // scroll-up

// 動きのきっかけの起点となるアニメーションの名前を定義
function fadeAnime(){

// ふわっ
$('.scroll-up01, .scroll-up02, .scroll-up03').each(function(){ //fadeUpTriggerというクラス名が
  var elemPos = $(this).offset().top-20;//要素より、20px上の
  var scroll = $(window).scrollTop();
  var windowHeight = $(window).height();
  if (scroll >= elemPos - windowHeight){
  $(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
  }
  });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function (){
  fadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述


//アコーディオンをクリックした時の動作
$('.faq-title').on('click', function() {//タイトル要素をクリックしたら
	var findElm = $(this).next(".box");//直後のアコーディオンを行うエリアを取得し
	$(findElm).slideToggle();//アコーディオンの上下動作
    
	if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
		$(this).removeClass('close');//クラス名を除去し
	}else{//それ以外は
		$(this).addClass('close');//クラス名closeを付与
	}
});

//ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
// $(window).on('load', function(){
// 	$('.accordion-area li:first-of-type section').addClass("open"); //accordion-areaのはじめのliにあるsectionにopenクラスを追加
// 	$(".open").each(function(index, element){	//openクラスを取得
// 		var Title =$(element).children('.title');	//openクラスの子要素のtitleクラスを取得
// 		$(Title).addClass('close');				//タイトルにクラス名closeを付与し
// 		var Box =$(element).children('.box');	//openクラスの子要素boxクラスを取得
// 		$(Box).slideDown(500);					//アコーディオンを開く
// 	});
// });

$(function () {
  $(window).scroll(function () {
    const windowHeight = $(window).height();
    const scroll = $(window).scrollTop();

    $('.element').each(function () {
      const targetPosition = $(this).offset().top;
      if (scroll > targetPosition - windowHeight + 100) {
        $(this).addClass("is-fadein");
      }
    });
  });
});

// スクロールふわっ