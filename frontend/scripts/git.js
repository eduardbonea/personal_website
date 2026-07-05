GitHubCalendar(".calendar", "eduardbonea", { 
    responsive: true,
    tooltips: true 
});

const gitlabContainer = document.getElementById("gitlab-stats-container");

if (gitlabContainer) {
  
  gitlabContainer.innerHTML = `
    <img src="https://gitlab-readme-stats.vercel.app/api?username=eduardbonea&theme=dark&hide_border=true&title_color=3b82f6&icon_color=3b82f6&text_color=a1a1aa" 
         alt="GitLab Stats eduardbonea"
         onerror="this.parentElement.innerHTML='<p style=color:var(--text-secondary)>Profil GitLab privat sau indisponibil.</p>'">
  `;
}