const { db } = require('../config/firebase');

class FirebaseService {
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }

  // Create a document
  async create(data) {
    const docRef = await this.collection.add({
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  }

  // Get all documents
  async getAll() {
    const snapshot = await this.collection.orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Get document by ID
  async getById(id) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() };
  }

  // Get documents by field (FIXED VERSION)
  async getByField(field, value) {
    const snapshot = await this.collection
      .where(field, '==', value)
      // Comment out orderBy to avoid index requirement
      // .orderBy('createdAt', 'desc')
      .get();
    
    // Sort in JavaScript instead
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return docs.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA; // Descending order (newest first)
    });
  }

  // Update document
  async update(id, data) {
    await this.collection.doc(id).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return this.getById(id);
  }

  // Delete document
  async delete(id) {
    await this.collection.doc(id).delete();
    return { id, deleted: true };
  }

  // Check if document exists
  async exists(id) {
    const doc = await this.collection.doc(id).get();
    return doc.exists;
  }
}

module.exports = FirebaseService;