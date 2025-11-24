const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class BaseModel {
    constructor(filename) {
        this.filePath = path.join(__dirname, '../data', filename);
    }

    async getAll() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') return [];
            throw error;
        }
    }

    async getById(id) {
        const all = await this.getAll();
        return all.find(item => item.id === id);
    }

    async create(data) {
        const all = await this.getAll();
        const newItem = { id: uuidv4(), ...data, createdAt: new Date().toISOString() };
        all.push(newItem);
        await this.save(all);
        return newItem;
    }

    async update(id, data) {
        const all = await this.getAll();
        const index = all.findIndex(item => item.id === id);
        if (index === -1) return null;

        all[index] = { ...all[index], ...data, updatedAt: new Date().toISOString() };
        await this.save(all);
        return all[index];
    }

    async delete(id) {
        const all = await this.getAll();
        const filtered = all.filter(item => item.id !== id);
        await this.save(filtered);
        return true;
    }

    async save(data) {
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }
}

module.exports = BaseModel;
