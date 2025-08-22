import mockProjects from "@/services/mockData/projects.json";

class ProjectServiceClass {
  constructor() {
    this.projects = [...mockProjects];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 250));
    return [...this.projects];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const project = this.projects.find(p => p.Id === parseInt(id));
    if (!project) throw new Error("Project not found");
    return { ...project };
  }

  async create(projectData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const maxId = this.projects.length > 0 ? Math.max(...this.projects.map(p => p.Id)) : 0;
    const newProject = {
      Id: maxId + 1,
      ...projectData,
      createdAt: new Date().toISOString(),
      taskCount: 0
    };
    
    this.projects.push(newProject);
    return { ...newProject };
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    
    const index = this.projects.findIndex(p => p.Id === parseInt(id));
    if (index === -1) throw new Error("Project not found");
    
    this.projects[index] = { ...this.projects[index], ...updateData };
    return { ...this.projects[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const index = this.projects.findIndex(p => p.Id === parseInt(id));
    if (index === -1) throw new Error("Project not found");
    
    this.projects.splice(index, 1);
    return true;
  }
}

export const ProjectService = new ProjectServiceClass();