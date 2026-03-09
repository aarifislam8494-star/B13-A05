const cardContainer = document.getElementById("cardContainer");
const allBtn = document.getElementById("allbtn");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const loadingSpinner = document.getElementById("loadingSpinner");
const cardDetailsModal = document.getElementById("card_modal");

const loadIssues = (status = 'all') => {
    showSpinner();
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(res => res.json())
        .then(data => {
            hideSpinner(); 
            let issues = data.data;
            if (status !== 'all') {
                issues = data.data.filter(issue => issue.status === status);
            }
            displayIssues(issues);
        });
};

// set priority color from api
const getPriorityColor = (priorityColor) => {
    if (priorityColor === 'high') return 'color: red; background-color: #feecec;';
    if (priorityColor === 'medium') return 'color: #b8860b; background-color: #fff6db;';
    if (priorityColor === 'low') return 'color: gray; background-color: #e8e8e8;';
    return '';
};

const getBorder = (borderColor) => {
    if (borderColor == 'open') return 'border-top:3px solid green'
    if (borderColor == 'closed') return 'border-top:3px solid purple';
    return ''
};

const displayIssues = (issues) => {

    // console.log(issues);
    if(issues.length === 0){
        cardContainer.innerHTML = `
        <div class="text-center items-center flex flex-col">
            <img src="assets/istockphoto-827247322-612x612.jpg" class="w-[250px]" alt="">
            <h4>No Data Found!!</h4>
        </div>
        ` 
        const totalCount = document.getElementById('totalCount')
    totalCount.textContent = issues.length;
        return
    }
     cardContainer.innerHTML = ""
     const totalCount = document.getElementById('totalCount')
    totalCount.textContent = issues.length;
    issues.forEach((issue) => {

        // console.log(issue);
        const problem = document.createElement('div');
        problem.innerHTML = `
         <div style="${getBorder(issue.status)}" onclick="openModal(${issue.id})" class="cursor-pointer h-full p-[20px] sm:max-w-[350px]  space-y-6 bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
            <span style="${getPriorityColor(issue.priority)}"class="py-[15px] px-[25px] rounded-lg font-semibold">${issue.priority}</span>
            <h3 class="font-semibold text-xl mt-[25px]">${issue.title}</h3>
            <p class="text-[#64748B] line-clamp-2 flex-1">${issue.description}</p>
            <div class="mt-[12px] flex gap-[12px] overflow-hidden">
                <span style="font-size:12px" class="rounded-lg   px-[10px] h-fit py-[8px] text-[red] bg-[#feecec]">${issue.labels[0]}</span>
                ${issue.labels[1] ? `<span style="font-size:12px" class="px-[10px] h-fit rounded-lg py-[8px] text-[#91918e] bg-[#fff6db]">${issue.labels[1]}</span>` : ''}
                </div>
            <div style ="border-top: 1px solid #64748B">
                <p class="text-[#64748B] text-[17px] mt-[10px]">#Author by ${issue.author}</p>
                <p class="text-[#64748B] text-[17px]">#CreateAt ${new Date(issue.createdAt).toLocaleDateString('en-GB')}</p>
            </div>
        </div>
        `
        cardContainer.appendChild(problem);
    })
    };
function showSpinner() {
    loadingSpinner.classList.remove('hidden');
     // cardContainer.innerHTML ='';
}
function hideSpinner() {
    loadingSpinner.classList.add('hidden')
}

document.querySelectorAll('.button:not(.btn-new)').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.btn:not(.btn-new)').forEach(b => b.classList.replace('btn-primary', 'btn-outline'));
        btn.classList.replace('btn-outline', 'btn-primary');
        const status = btn.textContent.trim().toLowerCase();
        loadIssues(status);
    });
});

function openModal(id) {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    fetch(url).then((res) => res.json()).then((data) => {
        const issuE = data.data;
        document.getElementById('modal_title').innerText = issuE.title
        document.getElementById('modal_status').innerText = issuE.status;
        document.getElementById('modal_author').innerText = issuE.author;
        document.getElementById('update_date').innerText = new Date(issuE.updatedAt).toLocaleDateString('en-GB');
        document.getElementById('modal_description').innerText = issuE.description;
         document.getElementById('modal_bug').innerText = issuE.labels[0];
        const modalHelp = document.getElementById('modal_help');
        if(issuE.labels[1]){
            modalHelp.innerText = issuE.labels[1];
            
        }
        else{
            modalHelp.innerText = 'No issue found'
        }


        const assigneeEl = document.getElementById('modal_assignee');
        if (issuE.assignee) {
            assigneeEl.innerText = issuE.assignee;
            assigneeEl.parentElement.style.display = 'block';
        } else {
            assigneeEl.innerText = "No Assignee Found"
        }

        const priorityElement = document.getElementById('modal_priority');
        priorityElement.innerText = issuE.priority;
        priorityElement.setAttribute('style', getPriorityColor(issuE.priority));

    });
    cardDetailsModal.showModal();
    // console.log('Open Modal',id);
}

loadIssues();

document.getElementById('btn-search').addEventListener('click',()=>{
    const inputSearch = document.getElementById('input-search');
    const searchValue = inputSearch.value.trim().toLowerCase();
    console.log(searchValue);
    showSpinner()
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`)
    .then((res)=>res.json())
    .then((data)=>{
        const allData = data.data;
        console.log(allData);
        const filterData = allData.filter((data)=>data.title.toLowerCase().includes(searchValue))
        displayIssues(filterData);
        hideSpinner();
    });
})