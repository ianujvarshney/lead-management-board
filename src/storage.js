import { DEFAULT_STAGES, DEFAULT_AGENTS } from './types';

const STORAGE_KEYS = {
  LEADS: 'leadManagement_leads',
  STAGES: 'leadManagement_stages',
  AGENTS: 'leadManagement_agents'
};


export const storageService = {

  getLeads: () => {
    try {
      const leads = localStorage.getItem(STORAGE_KEYS.LEADS);
      return leads ? JSON.parse(leads) : [];
    } catch (error) {
      console.error('Error loading leads:', error);
      return [];
    }
  },

  saveLeads: (leads) => {
    try {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
      return true;
    } catch (error) {
      console.error('Error saving leads:', error);
      return false;
    }
  },


  getStages: () => {
    try {
      const stages = localStorage.getItem(STORAGE_KEYS.STAGES);
      return stages ? JSON.parse(stages) : DEFAULT_STAGES;
    } catch (error) {
      console.error('Error loading stages:', error);
      return DEFAULT_STAGES;
    }
  },

  saveStages: (stages) => {
    try {
      localStorage.setItem(STORAGE_KEYS.STAGES, JSON.stringify(stages));
      return true;
    } catch (error) {
      console.error('Error saving stages:', error);
      return false;
    }
  },

  getAgents: () => {
    try {
      const agents = localStorage.getItem(STORAGE_KEYS.AGENTS);
      return agents ? JSON.parse(agents) : DEFAULT_AGENTS;
    } catch (error) {
      console.error('Error loading agents:', error);
      return DEFAULT_AGENTS;
    }
  },

  saveAgents: (agents) => {
    try {
      localStorage.setItem(STORAGE_KEYS.AGENTS, JSON.stringify(agents));
      return true;
    } catch (error) {
      console.error('Error saving agents:', error);
      return false;
    }
  },

  clearAll: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.LEADS);
      localStorage.removeItem(STORAGE_KEYS.STAGES);
      localStorage.removeItem(STORAGE_KEYS.AGENTS);
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
};

export default storageService;