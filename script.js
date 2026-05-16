fetch("https://portfolio-backend.onrender.com/api/profile")
    .then(response => response.json())
    .then(data => {

        console.log(data);

        // HERO TITLE
        document.querySelector(".hero p").innerText = data.title;

        // CONTACT SECTION
        document.querySelector("#contact").innerHTML = `
            <h2 class="section-title">Contact Me</h2>

            <p>Email: ${data.email}</p>
            <p>Phone: ${data.phone}</p>

            <p>
                GitHub:
                <a href="${data.social.github}" target="_blank">
                    ${data.social.github}
                </a>
            </p>
        `;

        // SKILLS SECTION
        const skillsContainer = document.querySelector(".skills-grid");

        skillsContainer.innerHTML = "";

        data.skills.forEach(skill => {

            skillsContainer.innerHTML += `
                <div class="skill-card">
                    <h3>${skill}</h3>
                    <p>Skill loaded from Backend API</p>
                </div>
            `;
        });

        // PROJECTS SECTION
        const projectsContainer =
            document.querySelector(".projects-grid");

        projectsContainer.innerHTML = "";

        data.projects.forEach(project => {

            projectsContainer.innerHTML += `
                <div class="project-card">

                    <div class="project-content">

                        <h3>${project.name}</h3>

                        <p>${project.description}</p>

                    </div>

                </div>
            `;
        });

    })

    .catch(error => {

        console.error("Error fetching backend API:", error);

    });