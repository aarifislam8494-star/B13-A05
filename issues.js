const cardContainer = document.getElementById("cardContainer");

const loadIssues = () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayIssues(data.data));
}

const displayIssues = (issues) => {
 
    // console.log(issues);
    issues.forEach((issue) => {

        // console.log(issue);
        const problem = document.createElement('div');
        problem.innerHTML = `
        <div class="p-[20px] max-w-[350px] space-y-6 bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
            <span class="bg-[#feecec] text-[red] py-[15px] px-[25px]  rounded-lg font-semibold">${issue.priority}</span>
            <h3 class="font-semibold text-xl mt-[25px]">${issue.title}</h3>
            <p class="text-[#64748B]">${issue.description}</p>
            <div class="mt-[12px] flex gap-[12px]">
                <span class=" rounded-lg  p-[8px] text-[red] bg-[#feecec]">${issue.labels[0]}</span>
                <span class="px-[40px] rounded-lg p-[8px] text-[#91918e]  bg-[#fff6db]">${issue.labels[1]}</span>
            </div>
            <div>
                <p class="text-[#64748B] text-[17px]"># by john_doe</p>
                <p class="text-[#64748B] text-[17px]">1/15/2024</p>
            </div>
        </div>
        `
        cardContainer.appendChild(problem);
    })
}
loadIssues();