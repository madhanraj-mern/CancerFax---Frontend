import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  therapies: [
    {
      id: 1,
      name: 'TIL Therapy',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=640',
      description: 'A breakthrough treatment that reprograms your own immune cells to recognize and destroy cancer.'
    },
    {
      id: 2,
      name: 'CAR-T Cell Therapy',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=640',
      description: 'A breakthrough treatment that reprograms your own immune cells to recognize and destroy cancer.'
    },
    {
      id: 3,
      name: 'Gene Therapy',
      image: 'https://images.unsplash.com/photo-1579154204845-e59e40d2c79f?w=640',
      description: 'A breakthrough treatment that reprograms your own immune cells to recognize and destroy cancer.'
    },
    {
      id: 4,
      name: 'Gene Therapy for Thalassemia',
      image: 'https://images.unsplash.com/photo-1583912086096-8c60d75a53b2?w=640',
      description: 'A breakthrough treatment that reprograms your own immune cells to recognize and destroy cancer.'
    },
    {
      id: 5,
      name: 'NK Cell Therapy',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=640',
      description: 'A breakthrough treatment that reprograms your own immune cells to recognize and destroy cancer.'
    }
  ],
  clinicalTrials: [
    {
      id: 1,
      title: 'CAR T Cell therapy clinical trials'
    },
    {
      id: 2,
      title: 'Clinical trial for BALL CAR T-Cell therapy'
    },
    {
      id: 3,
      title: 'CAR T Cell therapy trials for multiple myeloma'
    },
    {
      id: 4,
      title: 'CAR T-Cell therapy clinical trials for Immune thrombocytopenia'
    }
  ],
  blogs: [
    {
      id: 1,
      title: 'Atezolizumab Plus Chemotherapy Improves Survival in Advanced-Stage Small-Cell Lung Cancer',
      category: 'Research',
      date: 'May 27, 2024',
      readTime: '7 min read',
      author: 'Author name goes here',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=640'
    },
    {
      id: 2,
      title: 'Darolutamide is approved by the USFDA for metastatic castration-sensitive prostate cancer',
      category: 'Research',
      date: 'May 27, 2024',
      readTime: '7 min read',
      author: 'Author name goes here',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=640'
    },
    {
      id: 3,
      title: 'Taletrectinib is approved by the USFDA for ROS1-positive non-small cell lung cancer',
      category: 'Research',
      date: 'May 27, 2024',
      readTime: '7 min read',
      author: 'Author name goes here',
      image: 'https://images.unsplash.com/photo-1579154204845-e59e40d2c79f?w=640'
    }
  ]
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    updateTherapies: (state, action) => {
      state.therapies = action.payload;
    },
    updateClinicalTrials: (state, action) => {
      state.clinicalTrials = action.payload;
    },
    updateBlogs: (state, action) => {
      state.blogs = action.payload;
    }
  }
});

export const { updateTherapies, updateClinicalTrials, updateBlogs } = contentSlice.actions;
export default contentSlice.reducer;










