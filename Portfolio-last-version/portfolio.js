let studentsTable = [];
let studentProjects = [];

let projectName,projectDate,projectLink;

let portfolioProjectsContainer = document.getElementById("portfolio_projcts_Container");

let studentName = document.getElementById("portfolio_createdBy");

let phoneNumber;
let email;

let downloadBtn = document.getElementById('btn_dpwnload');



for (let i = 0; i < localStorage.length; i++) {

    let key = localStorage.key(i);
    let item = localStorage.getItem(key);

    item = JSON.parse(item);

    studentsTable.push(item)

}

let CurrentStudent = studentsTable[studentsTable.length - 1]; 

studentProjects = CurrentStudent.Projects;
studentName.innerHTML += ` ${CurrentStudent.studentName} ${CurrentStudent.studentSurname}`;
phoneNumber = CurrentStudent.studentPhone;
email = CurrentStudent.studentEmail;


studentProjects.forEach(project => {

    let skills = project.skills;

    projectName = project.projectName;
    projectDate = project.realisedDate;
    projectLink = project.githubLink;

   

    let skillsContainer = `<ul class="skillsList">`;

    skills.forEach(skill => {

        skillsContainer += `<li>${skill}</li>`


    });
    skillsContainer += "</ul>";

    portfolioProjectsContainer.innerHTML += `<div class="portfolio_project_item">

                    <h4 class="cart_project_name">${projectName}</h4>
                    <p class="cart_project_date">This Projects Created By Me at <span class="date_span"> ${projectDate}</span> for more information click on the GitHub button </p>
                    <p>Using This Skills :</p>
                    ${skillsContainer}
                    <button class="GitHub_btn" onclick="window.open('${projectLink}', '_blank')">GitHub Url</button>
                </div>
`;
    
    console.log(CurrentStudent);
});


function Call(){

    alert(phoneNumber);

}

function Mail(){
    alert(email);
    
}

function Download() {

    DisplayDownloadBtn('none');
    let element = document.getElementById('portfolio');
    let options = {
        filename:     'portfolio_desktop.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a3', orientation: 'landscape' }
    };
    html2pdf().set(options).from(element).save();
    
    setTimeout(function() {
        DisplayDownloadBtn('inline-block');
    }, 2000);

}

function DisplayDownloadBtn(display = ''){

    downloadBtn.style.display = display;

}
