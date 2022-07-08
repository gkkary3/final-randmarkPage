document.addEventListener('DOMContentLoaded', function(){ 
    
    // 변수 지정
    var $slideWrap = document.querySelector('.container'),
        $slideContainer = document.querySelector('.slider-container'),
        $slide = document.querySelectorAll('.slide'),
        $navPrev = document.getElementById('prev'),
        $slideHeight = 0,
        $slideCount = $slide.length,
        $currentIndex = 0,
        $timer = undefined,
        $pagerHTML = '',
        $pager = document.querySelector('.pager'),
        // $pagerBtn = document.querySelectorAll('.pager span'),
        $navNext = document.getElementById('next');
                   
        //슬라이드의 높이 확인하여 부모의 높이로 지정하기 - 대상.offsetHeight
        for(var i = 0; i < $slideCount ; i++){
           if($slideHeight < $slide[i].offsetHeight){
                $slideHeight = $slide[i].offsetHeight;
           }
        }
        console.log($slideHeight);

        $slideWrap.style.height = $slideHeight +'px';
        $slideContainer.style.height = $slideHeight +'px';

        // 슬라이드가 있으면 가로로 배열하기
        for(var a = 0; a < $slideCount; a++){
            $slide[a].style.left = a * 100 + '%'; 
            // <span data-idx="1">2</span>
            $pagerHTML += '<span data-idx="'+ a +'">'+(a+1)+'</span>';
            $pager.innerHTML = $pagerHTML;
        }
        var $pagerBtn = document.querySelectorAll('.pager span');
       
        
        // 슬라이드 이동 함수 
        function goToSlide(idx){
            $slideContainer.classList.add('animated');
            $slideContainer.style.left = -100 * idx + '%';
            $currentIndex = idx;        
            
            //모든 $pagerBtn에 active 제거, 클릭된 요소에만 active 추가
            for(var y = 0; y<$pagerBtn.length; y++){
                $pagerBtn[y].classList.remove('active');
            }
            $pagerBtn[idx].classList.add('active');
        }//goToSlide

        goToSlide(0);

        // 버튼을 클릭하면 슬라이드 이동시키기
        $navPrev.addEventListener('click',function(){            
            //goToSlide($currentIndex - 1);

            if($currentIndex == 0){
                //$navPrev.classList.add('disabled');
                goToSlide($slideCount - 1);
            }else{
                //$navPrev.classList.remove('disabled');
                goToSlide($currentIndex - 1);
            } 
        });

        $navNext.addEventListener('click',function(){
            //goToSlide($currentIndex + 1);

           if($currentIndex == $slideCount - 1){
               // $navNext.classList.add('disabled');
               goToSlide(0);
           }else{
               // $navNext.classList.remove('disabled');
               goToSlide($currentIndex + 1);
           }
        });

    //자동 슬라이드
   // 4초마다 goToSlide(숫자); 0, 1, 2, 3,....5, 0
   // setInterval(할일, 4000);
   // 함수 = 할일 = function() { 실제 할일} 
   //실제 할일 = goToSlide(숫자); 0, 1, 2, 3,....5, 0


   
   //clearInterval(대상)
   // 자동 슬라이드 함수 
   function startAutoSlide(){
        $timer = setInterval(function(){
        //goToSlide(숫자); 0, 1, 2, 3,....5, 0
        // ci 0번 4초  1, ci 1 4초 2, .... ,ci 5 4초 , ni  0
    
        var nextIdx =($currentIndex + 1) % $slideCount; // 나눈 나머지 
        goToSlide(nextIdx);
       },4000);
   }
   startAutoSlide();

   function stopAutoSlide(){
        clearInterval($timer);
   }

   /*
   $slideWrap에 마우스가 들어오면 할일, 나가면 할일
   */
   $slideWrap.addEventListener('mouseenter',function(){
        stopAutoSlide();
   });
   $slideWrap.addEventListener('mouseleave',function(){
        startAutoSlide();
   });

   //pager로 슬라이드 이동하기 
   for(var x = 0; x < $pagerBtn.length; x++){
        $pagerBtn[x].addEventListener('click',function(event){ 
            console.log(event.target.innerText);
            //innerText 내용 반환 A.innerText / A.innerText = 'B';
            //innerHTML의 태그를 반환 A.innerHTML / a.innerHTML = '<h2>'

            // var pagerNum = event.target.getAttribute('data-idx');
            var pagerNum = event.target.innerText - 1;
            goToSlide(pagerNum);
            

        });
   }


// ----------------------gallery JS

const imageList = document.querySelector('.image-list');
const btns = document.querySelectorAll('.view-options button');
const imageListItems = document.querySelectorAll('.image-list li');
const active = 'active';
const listView = 'list-view';
const gridView = 'grid-view';
const dNone = 'd-none';

//버튼 활성화
for(const btn of btns){ //배열명 btns 하나하나 각각의 요소를 btn이라는 요소로 설정한다
    btn.addEventListener('click',function(){
        const parent = this.parentElement;
        document.querySelector('.view-options .active').classList.remove(active);
        parent.classList.add(active);

        if(parent.classList.contains('show-list')){
            parent.previousElementSibling.previousElementSibling.classList.add(dNone);
            imageList.classList.remove(gridView);
            imageList.classList.add(listView);

        }else{
            parent.previousElementSibling.classList.remove(dNone);
            imageList.classList.remove(listView);
            imageList.classList.add(gridView);
        }

    });
}

// 리스트 너비 조절 Range 스크립트
const rangeInput = document.querySelector('input[type="range"]');

rangeInput.addEventListener('input', function(){
    //this.value
    document.documentElement.style.setProperty('--minRangeValue', `${this.value}px`);
                                                                    //this.value + 'px'랑 같다
    //선택자.style.backgroundColor = 'blue';
    //선택자.style.setProperty('background-color', 'blue');
});

//검색키워드로 필터 적용
const captions = document.querySelectorAll('.image-list figcaption p:first-child');
const myArray = [];
let counter = 1;

for(const caption of captions){
    myArray.push({
        id:counter++,
        text:caption.textContent
    });
}
console.log(myArray);

const searchInput = document.querySelector('input[type="search"]');
const photosCounter = document.querySelector('.toolbar .counter span');

searchInput.addEventListener('keyup', keyupHandler);
//keyup : 키보드 눌르고 때는 순간
//keydown : 사용자가 키보드 눌렀을 떄 한번만 작동
//keypress : 사용자가 키보드 눌렀을 떄 계속 작동

function keyupHandler(){
    for(const item of imageListItems){
        item.classList.add(dNone);
    }
    const keywords = this.value;

    const filteredArray = myArray.filter(el => el.text.toLowerCase().includes(keywords.toLowerCase()));
    console.log(filteredArray);

    if(filteredArray.length > 0){
        for(const el of filteredArray ){
            //.image-list li:nth-child(2)
            //.image-list li:nth-child(el.id)
            document.querySelector(`.image-list li:nth-child(${el.id})`).classList.remove(dNone);
        }
    }
    photosCounter.textContent = filteredArray.length;
}

//filter 
// var arr = {3,15,9,20,25};
// var arr2 = arr.filter(function(n){  
//     return n % 5 == 0;  // 5로 나눴을 떄 나머지가 0인 값들만 다시 arr2 배열에 새로 넣겠다
// });
// console.log(arr2);

// var arr = [3,15,9,20,25];
// var arr2 = arr.filter(n=>{    return n % 5 == 0; });
// console.log(arr2);

// var arr = [3,15,9,20,25];
// var arr2 = arr.filter(n=>n % 5 == 0);
// console.log(arr2);



//====================NAV JS===================

const toggleBtn = document.querySelector('.ham');
const nav = document.querySelector('.nav-nav');
const navin = document.querySelector('.nav-in');
toggleBtn.addEventListener('click',()=>{
    nav.classList.toggle('active');
    navin.classList.toggle('active');
});

$(function () {
    $(document).scroll(function () {
      var $nav = $("#mainNavbar1");
      var $login = $(".login-btn");
      var $signUp = $(".signUp-btn");
      var $menu = $(".nav-menu");
      $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
      $login.toggleClass("color", $(this).scrollTop() > $nav.height());
      $signUp.toggleClass("color", $(this).scrollTop() > $nav.height());
      $menu.toggleClass("white", $(this).scrollTop() > $nav.height());
    });
  });
});//DOMcontentloaded




