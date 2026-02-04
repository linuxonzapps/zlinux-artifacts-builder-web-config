const artifactsEl = document.getElementById("artifacts");

function loadExample() {
    // Clear existing artifacts
    artifactsEl.innerHTML = '';
    
    // Set template
    document.getElementById("template").value = "templates/loz-script-project.yaml";
    
    // Add example artifact
    addArtifact();
    
    // Populate with example values
    const artifact = document.querySelector(".artifact");
    artifact.querySelector(".type").value = "script";
    artifact.querySelector(".version").value = "2025-09-07T16-13-09Z";
    artifact.querySelector(".repo").value = "linux-on-ibm-z-scripts";
    artifact.querySelector(".path").value = "src/build.sh";
    artifact.querySelector(".image").value = "ubuntu:22.04";
    
    render();
}

function addArtifact() {
    const div = document.createElement("div");
    div.className = "artifact";

    div.innerHTML = `
    <div class="artifact-header">
      Artifact
      <button class="danger" onclick="this.closest('.artifact').remove(); render()">Remove</button>
    </div>

    <label>Type</label>
    <select class="type" onchange="toggleFields(this); render()">
      <option value="script">script</option>
      <option value="binary">binary</option>
      <option value="rpm">rpm</option>
      <option value="container">container</option>
      <option value="debian">debian</option>
    </select>

    <label>Version</label>
    <input class="version" placeholder="2025-09-07T16-13-09Z" oninput="render()" />

    <div class="script-fields">
      <label>Repository Name</label>
      <input class="repo" placeholder="linux-on-ibm-z-scripts" oninput="render()" />

      <label>Build Script Path</label>
      <input class="path" placeholder="src/build.sh" oninput="render()" />

      <label>Docker Image</label>
      <input class="image" placeholder="ubuntu:22.04" oninput="render()" />
    </div>
  `;

    artifactsEl.appendChild(div);
    render();
}

function toggleFields(select) {
    const block = select.closest(".artifact");
    block.querySelector(".script-fields").style.display =
        select.value === "script" ? "block" : "none";
}

function validate(config) {
    const errors = [];

    if (!config.template) {
        errors.push("Missing mandatory 'template' field.");
    }

    if (!config.overrides.artifacts.length) {
        errors.push("At least one artifact is required.");
    }

    config.overrides.artifacts.forEach((a, i) => {
        if (!a.type) errors.push(`Artifact ${i + 1}: missing type.`);
        if (!a.version) errors.push(`Artifact ${i + 1}: missing version.`);
        if (a.type === "script") {
            if (!a.build_script.repo_name)
                errors.push(`Artifact ${i + 1}: repo_name required.`);
            if (!a.build_script.path)
                errors.push(`Artifact ${i + 1}: path required.`);
            if (!a.build_script.docker_image)
                errors.push(`Artifact ${i + 1}: docker_image required.`);
        }
    });

    return errors;
}

function render() {
    const config = {
        template: document.getElementById("template").value,
        overrides: { artifacts: [] }
    };

    document.querySelectorAll(".artifact").forEach(a => {
        const type = a.querySelector(".type").value;
        const version = a.querySelector(".version").value;

        const artifact = { type, version };

        if (type === "script") {
            artifact.build_script = {
                repo_name: a.querySelector(".repo").value,
                path: a.querySelector(".path").value,
                docker_image: a.querySelector(".image").value
            };
        }

        config.overrides.artifacts.push(artifact);
    });

    const errors = validate(config);
    document.getElementById("errors").textContent = errors.join(" ");

    document.getElementById("yaml").textContent =
        `template: ${config.template}
overrides:
  artifacts:
${config.overrides.artifacts.map(a => `    - type: ${a.type}
      version: ${a.version}
      build_script:
        repo_name: ${a.build_script?.repo_name}
        path: ${a.build_script?.path}
        docker_image: ${a.build_script?.docker_image}`).join("\n")}`;
}

function copyYAML() {
    navigator.clipboard.writeText(document.getElementById("yaml").textContent);
}

function downloadYAML() {
    const blob = new Blob([document.getElementById("yaml").textContent], {
        type: "text/yaml"
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = ".build-template.yaml";
    a.click();
}

render();
