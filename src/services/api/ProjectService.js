class ProjectServiceClass {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'project_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "icon_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "task_count_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      // Map database fields to application format
      return response.data.map(project => ({
        Id: project.Id,
        name: project.name_c,
        color: project.color_c,
        icon: project.icon_c,
        createdAt: project.created_at_c,
        taskCount: project.task_count_c || 0
      }));
    } catch (error) {
      console.error("Error fetching projects:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "icon_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "task_count_c"}}
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success || !response.data) {
        throw new Error("Project not found");
      }
      
      // Map database fields to application format
      const project = response.data;
      return {
        Id: project.Id,
        name: project.name_c,
        color: project.color_c,
        icon: project.icon_c,
        createdAt: project.created_at_c,
        taskCount: project.task_count_c || 0
      };
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  }

  async create(projectData) {
    try {
      // Only include Updateable fields as per field visibility
      const params = {
        records: [{
          name_c: projectData.name,
          color_c: projectData.color,
          icon_c: projectData.icon,
          created_at_c: projectData.createdAt,
          task_count_c: projectData.taskCount ? parseInt(projectData.taskCount) : 0
        }]
      };
      
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} projects:`, failed);
          failed.forEach(record => {
            if (record.message) console.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          // Map database fields to application format
          const createdProject = successful[0].data;
          return {
            Id: createdProject.Id,
            name: createdProject.name_c,
            color: createdProject.color_c,
            icon: createdProject.icon_c,
            createdAt: createdProject.created_at_c,
            taskCount: createdProject.task_count_c || 0
          };
        }
      }
      
      throw new Error("Failed to create project");
    } catch (error) {
      console.error("Error creating project:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async update(id, updateData) {
    try {
      // Only include Updateable fields as per field visibility
      const updateFields = {};
      
      if (updateData.name !== undefined) updateFields.name_c = updateData.name;
      if (updateData.color !== undefined) updateFields.color_c = updateData.color;
      if (updateData.icon !== undefined) updateFields.icon_c = updateData.icon;
      if (updateData.taskCount !== undefined) updateFields.task_count_c = updateData.taskCount ? parseInt(updateData.taskCount) : 0;
      
      const params = {
        records: [{
          Id: parseInt(id),
          ...updateFields
        }]
      };
      
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} projects:`, failed);
          failed.forEach(record => {
            if (record.message) console.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          // Map database fields to application format
          const updatedProject = successful[0].data;
          return {
            Id: updatedProject.Id,
            name: updatedProject.name_c,
            color: updatedProject.color_c,
            icon: updatedProject.icon_c,
            createdAt: updatedProject.created_at_c,
            taskCount: updatedProject.task_count_c || 0
          };
        }
      }
      
      throw new Error("Failed to update project");
    } catch (error) {
      console.error("Error updating project:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const params = { 
        RecordIds: [parseInt(id)]
      };
      
      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} projects:`, failed);
          failed.forEach(record => {
            if (record.message) console.error(record.message);
          });
        }
        
        return successful.length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting project:", error?.response?.data?.message || error);
      throw error;
    }
  }
}

export const ProjectService = new ProjectServiceClass();