const repositories = [
    {
        name: "minio",
        description: "MinIO is a high-performance, S3 compatible object store, open sourced under GNU AGPLv3 license.",
        language: "Shell",
        url: "https://github.com/linuxonzapps/minio"
    },
    {
        name: "openresty",
        description: "High Performance Web Platform Based on Nginx and LuaJIT",
        language: "Shell",
        url: "https://github.com/linuxonzapps/openresty"
    },
    {
        name: "sysdig",
        description: "Linux system exploration and troubleshooting tool with first class support for containers",
        language: "Shell",
        url: "https://github.com/linuxonzapps/sysdig"
    },
    {
        name: "erlang",
        description: "Erlang/OTP",
        language: "Shell",
        url: "https://github.com/linuxonzapps/erlang"
    },
    {
        name: "netty-tcnative",
        description: "A fork of Apache Tomcat Native, based on finagle-native",
        language: "Shell",
        url: "https://github.com/linuxonzapps/netty-tcnative"
    },
    {
        name: "opa",
        description: "Open Policy Agent (OPA) is an open source, general-purpose policy engine.",
        language: "Shell",
        url: "https://github.com/linuxonzapps/opa"
    },
    {
        name: "envoy",
        description: "Cloud-native high-performance edge/middle/service proxy",
        language: "Shell",
        url: "https://github.com/linuxonzapps/envoy"
    },
    {
        name: "spark",
        description: "Apache Spark - A unified analytics engine for large-scale data processing",
        language: "Shell",
        url: "https://github.com/linuxonzapps/spark"
    },
    {
        name: "kind",
        description: "Kubernetes IN Docker - local clusters for testing Kubernetes",
        language: "Shell",
        url: "https://github.com/linuxonzapps/kind"
    },
    {
        name: "terraform",
        description: "Terraform enables you to safely and predictably create, change, and improve infrastructure.",
        language: "Shell",
        url: "https://github.com/linuxonzapps/terraform"
    },
    {
        name: "spire",
        description: "The SPIFFE Runtime Environment",
        language: "Shell",
        url: "https://github.com/linuxonzapps/spire"
    },
    {
        name: "bazel",
        description: "A fast, scalable, multi-language and extensible build system",
        language: "Shell",
        url: "https://github.com/linuxonzapps/bazel"
    },
];

function renderRepositories() {
    const container = document.getElementById('repositories-list');
    if (!container) return;

    container.innerHTML = repositories.map(repo => `
        <div class="repo-item">
            <div class="repo-header">
                <a href="${repo.url}" target="_blank" class="repo-name">${repo.name}</a>
                <span class="repo-language">${repo.language}</span>
            </div>
            <p class="repo-description">${repo.description}</p>
            <a href="${repo.url}/releases" target="_blank" class="repo-releases">View Releases →</a>
        </div>
    `).join('');
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderRepositories);
} else {
    renderRepositories();
}
