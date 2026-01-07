// Mock blockchain verification service
export interface BlockchainGuide {
  id: string;
  name: string;
  hash: string;
  verified: boolean;
  certifications: string[];
  verificationTimestamp: string;
}

// Mock blockchain database
const blockchainDatabase: BlockchainGuide[] = [
  {
    id: 'guide_001',
    name: 'Ramesh Kumar Munda',
    hash: 'bc1a2f3d4e5f6789012345678901234567890abcdef',
    verified: true,
    certifications: ['Certified Nature Guide', 'First Aid Certified', 'Wildlife Expert'],
    verificationTimestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: 'guide_002',
    name: 'Sunita Devi Oraon',
    hash: 'bc2b3c4d5e6f7890123456789012345678901bcdef0',
    verified: true,
    certifications: ['Cultural Heritage Guide', 'Handicrafts Expert', 'Tourism Board Certified'],
    verificationTimestamp: '2024-01-20T14:45:00Z'
  },
  {
    id: 'guide_003',
    name: 'Manoj Singh Kharwar',
    hash: 'bc3c4d5e6f7890123456789012345678901cdef012',
    verified: true,
    certifications: ['Adventure Guide', 'Mountain Rescue Certified', 'Safety Expert'],
    verificationTimestamp: '2024-01-25T09:15:00Z'
  }
];

export class BlockchainService {
  static async verifyGuide(hash: string): Promise<{ isValid: boolean; guide?: BlockchainGuide }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    const guide = blockchainDatabase.find(g => g.hash === hash);
    
    if (guide && guide.verified) {
      return { isValid: true, guide };
    }
    
    // 10% chance of validation failure for demo purposes
    const shouldFail = Math.random() < 0.1;
    if (shouldFail) {
      return { isValid: false };
    }
    
    return { isValid: !!guide, guide };
  }
  
  static async getVerifiedGuides(): Promise<BlockchainGuide[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return blockchainDatabase.filter(guide => guide.verified);
  }
  
  static async addGuideToBlockchain(guideData: Omit<BlockchainGuide, 'verificationTimestamp'>): Promise<boolean> {
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newGuide: BlockchainGuide = {
      ...guideData,
      verificationTimestamp: new Date().toISOString()
    };
    
    blockchainDatabase.push(newGuide);
    return true;
  }
  
  static generateHash(guideId: string, name: string): string {
    // Simple hash generation for demo
    const data = `${guideId}_${name}_${Date.now()}`;
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return `bc${Math.abs(hash).toString(16).padStart(40, '0')}`;
  }
}