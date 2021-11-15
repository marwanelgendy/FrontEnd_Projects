/* Global Variables */

    //random Background imgs
    let backgroundOption = true

    //variable to control interval
    let backgroundInterval;

/* Global Variables */

/*Start Local Storage */

    //check if there is local storage color option
    let mainColor = localStorage.getItem('color-option')

    if(mainColor != null){

        document.documentElement.style.setProperty('--main-color' ,mainColor)

        //remove active class from all color list item
        document.querySelectorAll('.color-list li').forEach(elem => {

            elem.classList.remove('active')

            //add active class to item that has data-color same as mainColor
            if(elem.dataset.color === mainColor){
                elem.classList.add('active')
            }
        })
    }

    //check if there is local storage background option
    let backgroundLocalItem = localStorage.getItem('background-option')

    if(backgroundLocalItem !== null){

        if(backgroundLocalItem === "true"){
            backgroundOption = true
        }
        else{
            backgroundOption = false
        }

        //remove active class from all spans
        document.querySelectorAll('.random-background span').forEach(elem => {

            elem.classList.remove('active')
            if(backgroundLocalItem === "true" && elem.dataset.background === "yes"){
                elem.classList.add('active')
            }
            else if(backgroundLocalItem === "false" && elem.dataset.background === "no"){
                elem.classList.add('active')
            }
        })
    }

    //check if there is local storage Bullets option
    let bulletLocalItem = localStorage.getItem('bullet-option')

    if(bulletLocalItem !== null){

        document.querySelectorAll('.bullet-option span').forEach(span => {
            span.classList.remove('active')
        })
        
        if(bulletLocalItem === 'block'){
            document.querySelector('.nav-bullets').style.display = 'block'
            document.querySelector('.bullet-option .yes').classList.add('active')
        }
        else{
            document.querySelector('.nav-bullets').style.display = 'none'
            document.querySelector('.bullet-option .no').classList.add('active')
        }

    }
/*End Local Storage */

/*Start Settings Options */
    /* Colors Option */
        //Toggle spin Class on icon
        document.querySelector('.toggle-settings .fa-cog').onclick = function(){
            this.classList.toggle('fa-spin')
            document.querySelector('.settings-box').classList.toggle('open')
        }

        //switch colors
        const colorlist = document.querySelectorAll('.color-list li')

        colorlist.forEach((li) => {
            li.addEventListener('click',(e)=>{
                //set color in root variable
                document.documentElement.style.setProperty('--main-color' ,e.target.dataset.color)

                //set color on local storage
                localStorage.setItem('color-option',e.target.dataset.color)

                //remove active class from all childern and add it to e
                handleActiveState(e)
            })
        })
    /* Colors Option */

    /* Background Option */
        //switch random background option
        const randomBackEl = document.querySelectorAll('.random-background span')

        //remove active class from all span
        randomBackEl.forEach(span => {
            //remove active class from all childern
            span.addEventListener('click' , (e)=>{
                //remove active class from all childern and add it to e
                handleActiveState(e)

                if(e.target.dataset.background === "yes"){

                    backgroundOption = true;
                    randomizeImgs();
                    localStorage.setItem('background-option',true)
                }else{

                    backgroundOption = false;
                    clearInterval(backgroundInterval)
                    localStorage.setItem('background-option',false)
                }
            })

        })
    /* Background Option */
    /* Bullets Option */
        let bulletSpan = document.querySelectorAll('.bullet-option span')

        let bulletsContainer = document.querySelector('.nav-bullets')
        
        bulletSpan.forEach(span => {
            span.addEventListener('click' , (e) => {

                if(span.dataset.display === "show"){
                    bulletsContainer.style.display = 'block'
                    localStorage.setItem('bullet-option' , 'block')
                }
                else{
                    bulletsContainer.style.display = 'none'
                    localStorage.setItem('bullet-option' , 'none')
                }

                handleActiveState(e)
            })
        })
    /* Bullets Option */
    /* Reset option */
        document.querySelector('.reset-option').onclick = function(){
            localStorage.clear()
            // localStorage.removeItem('color-option')
            // localStorage.removeItem('background-option')
            // localStorage.removeItem('bullet-option')

            window.location.reload();
        }
    /* Reset option */
/*End Settings Option */

/*Start Landing Page */

    //Select landing page element
    let landingPage = document.querySelector('.landing-page')

    //get array of images
    let imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"]

    //function to randomize imgs
    function randomizeImgs(){
        if(backgroundOption === true){
            //change background randomly
            backgroundInterval = setInterval(()=>{
                let random = Math.floor(Math.random() * imgsArray.length)

                landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[random] + '")'
            },7000)
        }
    }

    randomizeImgs();

/*End Landing Page */

/* Start our Skills */
    //Select Skills Selector
    let ourSkills = document.querySelector('.skills');

    window.onscroll = function(){

        //skiils offest top
        let skillsOffsetTop = ourSkills.offsetTop; // 1282

        //skills offset hight
        let skillOffsetHeight = ourSkills.offsetHeight // 634

        //window height
        let windowHeight = this.innerHeight; // 913

        //window scroll top
        let windowScrollTop = this.pageYOffset

        if(windowScrollTop >= (skillsOffsetTop + skillOffsetHeight - windowHeight)){

            let allSkills = document.querySelectorAll('.skill-box .skill-progress span')

            allSkills.forEach(skill => {
                skill.style.width = skill.dataset.progress
            })
        }
    }
/* End our Skills */

/* Start our Gallery */
    //get our Gallery
    let ourGallery = document.querySelectorAll('.gallery .img-box img')

    ourGallery.forEach(img => {
        img.addEventListener('click' , ()=>{
            //create overlay
            let overlay = document.createElement('div')
            overlay.className = 'popup-overlay'

            //append overlay to body
            document.body.appendChild(overlay)

            //create popup box
            let popupBox = document.createElement("div")

            popupBox.className = 'popup-box'

            //add heading to img
            if(img.alt !== null){
                let imgHeading = document.createElement('h3')
                let imgText = document.createTextNode(img.alt)

                imgHeading.appendChild(imgText)
                popupBox.appendChild(imgHeading)
            }

            //create img
            let popupImg = document.createElement('img')

            popupImg.src = img.src

            //add img to popup box
            popupBox.appendChild(popupImg)

            //add popup box to body
            document.body.appendChild(popupBox)

            //create close span
            let closeBtn = document.createElement('span')

            //create close text
            let closetextBtn = document.createTextNode('X')
            //add close text to clost Button
            closeBtn.appendChild(closetextBtn)
            //add class to close Buttton
            closeBtn.className = 'close-button'
            // add close btn to popupBox
            popupBox.appendChild(closeBtn)
        })

        //close popup Box
        document.addEventListener('click' , (e)=>{
            if(e.target.className =='close-button'){
                e.target.parentNode.remove();

                //removr overlay
                document.querySelector(".popup-overlay").remove();
            }
        })
        
    })
/* End our Gallery */

// Start Scroll to sections
    //get all bullets
    let allBullets = document.querySelectorAll('.nav-bullets .bullet');

    //get all links
    let allLink = document.querySelectorAll('.links a');

    function scrollToSections(elements){
        elements.forEach(ele => {
            ele.addEventListener('click' , (e) =>{
                e.preventDefault()
                document.querySelector(e.target.dataset.section).scrollIntoView({
                    behavior:'smooth'
                })
            })
        })
    }

    scrollToSections(allBullets)
    scrollToSections(allLink)
// End Scroll to sections

//Handle Active state
function handleActiveState(event){

    event.target.parentNode.querySelectorAll('.active').forEach(elem => {
        elem.classList.remove('active')
    })

    //add active class to target element
    event.target.classList.add('active')
}

// toggle menue
let toggleBtn = document.querySelector('.toggle-menu')
let theLinks = document.querySelector('.links')

toggleBtn.onclick = function(){

    this.classList.toggle('menu-icon')
    theLinks.classList.toggle('open')
}

document.body.addEventListener('click' , (e) => {
    if(e.target.parentNode.className === "links-container" 
    || e.target.parentNode.classList[0] === "toggle-menu"
    || e.target.parentNode.classList[0] === "links"
    || e.target.parentNode.parentNode.classList[0] === "links"){

    }
    else{
        toggleBtn.classList.remove('menu-icon')
        theLinks.classList.remove('open')
    }
})
// toggle menue




