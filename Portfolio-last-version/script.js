class Projects {

    constructor(projectName, githubLink, skills = [], realisedDate) {

        this.projectName = projectName;
        this.githubLink = githubLink;
        this.skills = skills;
        this.realisedDate = realisedDate;

    }


}

class Students {
    constructor(studentName, studentSurname, studentEmail, studentPhone, studentGroup, Projects = []) {
        this.studentName = studentName;
        this.studentSurname = studentSurname;
        this.studentEmail = studentEmail;
        this.studentPhone = studentPhone;
        this.studentGroup = studentGroup;
        this.Projects = Projects;

    }
}

let fNameInput, lNameInput, emailInput, phoneNumberInput, groupInput;

fNameInput = document.getElementById("student_fName");
lNameInput = document.getElementById("student_lName");
emailInput = document.getElementById("student_email");
groupInput = document.getElementById("student_group");
phoneNumberInput = document.getElementById("student_phone");

let projectsContainer = document.getElementById("projcts_Container");
let projectsCartsContainer = document.getElementById("items_container");


let projectSkills = document.querySelectorAll(".skillsBox");
let skillsArray = [];



let studentsTable = [];



for (let i = 0; i < localStorage.length; i++) {

    let key = localStorage.key(i);
    let item = localStorage.getItem(key);

    item = JSON.parse(item);

    studentsTable.push(item)

}



for(let skill of projectSkills ){

    skill.addEventListener('click',function(){

        if(skill.checked == true){

            skillsArray.push(skill.value);
            alert(skillsArray + ` the ${skill.value} Added Successfully`)

        
        }else{

            let index = skillsArray.indexOf(skill.value);

            skillsArray.splice(index,1);
            
            alert(skillsArray + ` the ${skill.value} Removed Successfully`)

        }

    });

}

function ContinueBtn() {
    
    const phonePattern = /^(?:\+212|00212)\d{9}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    if(fNameInput.value.trim() === ""){
        
        alert("Please Fill your First Name");
        return;

    }else if (lNameInput.value.trim() === ""){
        
        alert("Please Fill your Last Name");
        return;


    }else if(emailInput.value.trim() === ""){
        
        alert("Please Fill your Email");
        return;


    }else if(!emailPattern.test(emailInput.value.trim())){
        
        alert("Please enter a valid email address.");
        return;


    }else if(phoneNumberInput.value === ""){
        
        alert("Please Fill your Phone Number ");
        return;


    }else if(!phonePattern.test(phoneNumberInput.value)){

        alert("Phone number must start with +212 or 00212 and be followed by 9 digits.");
        return;


    }else if(groupInput.value.trim() === ""){
        
        alert("Please Choose Your Group");
        return;

    }else{
        
        let newStudent = new Students(fNameInput.value, lNameInput.value, emailInput.value, phoneNumberInput.value, groupInput.value);
        studentsTable.push(newStudent);

        for (let x = 0; x < studentsTable.length; x++) {

            localStorage.setItem(`students${x}`, JSON.stringify(studentsTable[x]));
    
        }

        fNameInput.value = "";
        lNameInput.value = "";
        emailInput.value = "";
        phoneNumberInput.value = "";
        groupInput.value = "";
    
        window.location.href = "projects.html";
    }



}

function saveData() {

    let projectName = document.getElementById("projectName").value;
    let projectLink = document.getElementById("projectLink").value;  
    let projectDate = document.getElementById("projectDate").value;
    
    const githubPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;


    if(projectName.trim() == ""){
        alert("Please Fill Project Name");
        return;
    }else if (projectLink.trim() == ""){
        
        alert("Please Fill GitHub Link");
        return;
    }else if (!githubPattern.test(projectLink.trim())){
        
        alert("Please Fill A Valid url (Start With https:// or http://)");
        return;
    }else if (skillsArray.length == 0){
        
        alert("Please Check At Least 1 Skill");
        return;
    }else if(projectDate.trim() == ''){
        alert("Please Fill The Date");
        return;
    }else{

        let CurrentStudent = studentsTable[studentsTable.length - 1]; 

        let newProject = new Projects(projectName, projectLink, skillsArray, projectDate);

        CurrentStudent.Projects.push(newProject);

        localStorage.setItem(`students${studentsTable.length - 1}`, JSON.stringify(CurrentStudent));

        alert(`Project added successfully for ${CurrentStudent.studentName} ${CurrentStudent.studentSurname}`);

        let skillsContainer = `<ul class="skillsList">`;
        skillsArray.forEach(skill => {

            skillsContainer += `<li>${skill}</li>`


        });
        skillsContainer += "</ul>";

        projectsCartsContainer.innerHTML += `<div class="project_item">

                    <h4 class="cart_project_name">${projectName}</h4>
                    <p class="cart_project_date">Created At : ${projectDate}</p>
                    ${skillsContainer}
                    <button class="GitHub_btn" onclick="window.open('${projectLink}', '_blank')">GitHub Url</button>
                </div>`;




        document.getElementById("projectName").value = "";
        document.getElementById("projectLink").value = "";
        document.getElementById("projectDate").value = "";
        skillsArray = [];

        projectSkills.forEach(skill => {

            skill.checked = false;
            
        });


    }

    

}

function finish(){
    window.location.href = "portfolio.html";
}

function clearStorage(){
    localStorage.clear();
}

