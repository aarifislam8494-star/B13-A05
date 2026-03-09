const cardContainer = document.getElementById("cardContainer");
const allBtn = document.getElementById("allbtn");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const loadingSpinner = document.getElementById("loadingSpinner");

const loadIssues = () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayIssues(data.data));
}

// set priority color from api
const getPriorityColor = (priorityColor) => {
    if (priorityColor === 'high') return 'color: red; background-color: #feecec;';
    if (priorityColor === 'medium') return 'color: #b8860b; background-color: #fff6db;';
    if (priorityColor === 'low') return 'color: gray; background-color: #e8e8e8;';
    return '';
};

const displayIssues = (issues) => {
 
    // console.log(issues);
    issues.forEach((issue) => {

        // console.log(issue);
        const problem = document.createElement('div');
        problem.innerHTML = `
        <div class="p-[20px] max-w-[350px] h-[100%] space-y-6 bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
            <span style="${getPriorityColor(issue.priority)}"class="py-[15px] px-[25px] rounded-lg font-semibold">${issue.priority}</span>
            <h3 class="font-semibold text-xl mt-[25px]">${issue.title}</h3>
            <p class="text-[#64748B]">${issue.description}</p>
            <div class="mt-[12px] flex gap-[12px] overflow-hidden">
                <span class="rounded-lg  px-[10px] py-[8px] text-[red] bg-[#feecec]">${issue.labels[0]}</span>
                ${issue.labels[1] ? `<span class="px-[10px] rounded-lg py-[8px] text-[#91918e] bg-[#fff6db]">${issue.labels[1]}</span>` : ''}
            <div>
                <p class="text-[#64748B] text-[17px]">#Author by ${issue.author}</p>
                ${issue.assignee ? `<span class="text-[#64748B] text-[17px]">#Assignee by ${issue.assignee}</span>` : ''}
                <p class="text-[#64748B] text-[17px]">#CreateAt ${issue.createdAt}</p>
                <p class="text-[#64748B] text-[17px]">#UpdateAt ${issue.updatedAt}</p>
            </div>
        </div>
        `
        cardContainer.appendChild(problem);
    })
    };
function showSpinner(){
    loadingSpinner.classList.remove('hidden');
    cardContainer.innerHTML ='';
}
function hideSpinner(){
    loadingSpinner.classList.add('hidden')
}
loadIssues();