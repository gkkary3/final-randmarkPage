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
       },3000);
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

});//DOMcontentloaded




