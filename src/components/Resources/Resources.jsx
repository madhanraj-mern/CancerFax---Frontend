import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchResourcesSection, fetchBlogs } from '../../store/slices/resourcesSlice';
import { getMediaUrl } from '../../services/api';

const Section = styled.section`
  padding: 102px 120px 102px 120px;
  background: #FAFAFA;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 1200px) {
    padding: 90px 80px 90px 80px;
  }
  
  @media (max-width: 900px) {
    padding: 70px 60px 70px 60px;
  }
  
  @media (max-width: 768px) {
    padding: 60px 32px 60px 32px;
  }
  
  @media (max-width: 480px) {
    padding: 50px 20px 50px 20px;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 60px;
  gap: 40px;
  
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 40px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 600px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 16px;
    max-width: 100%;
  }
`;

const Label = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 10px;
    letter-spacing: 2px;
  }
`;

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 42px;
  font-weight: 700;
  color: #1F2937;
  line-height: 1.3;
  letter-spacing: -0.8px;
  margin: 0;
  
  @media (max-width: 1024px) {
    font-size: 36px;
  }
  
  @media (max-width: 768px) {
    font-size: 32px;
    letter-spacing: -0.5px;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const ViewAllButton = styled.button`
  padding: 18px 40px;
  background: #3B4A54;
  color: white;
  border: none;
  border-radius: 50px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  
  @media (hover: hover) {
    &:hover {
      background: #2C3942;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(59, 74, 84, 0.3);
    }
  }
  
  &:active {
    transform: translateY(0);
    background: #2C3942;
  }
  
  @media (max-width: 900px) {
    align-self: flex-start;
  }
  
  @media (max-width: 480px) {
    padding: 16px 32px;
    font-size: 14px;
    width: 100%;
  }
`;

const BlogsGrid = styled.div`
  display: grid;
  grid-template-columns: 467px 1fr;
  gap: 16px;
  width: 100%;
  
  @media (max-width: 1200px) {
    grid-template-columns: 420px 1fr;
    gap: 16px;
  }
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const FeaturedCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  height: fit-content;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  
  @media (hover: hover) {
    &:hover {
      transform: translateY(-4px);
    }
  }
  
  &:active {
    opacity: 0.9;
  }
  
  @media (max-width: 768px) {
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const FeaturedImage = styled.div`
  width: 100%;
  height: 297px;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  @media (hover: hover) {
    ${FeaturedCard}:hover & {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }
    
    ${FeaturedCard}:hover & img {
      transform: scale(1.05);
    }
  }
  
  @media (max-width: 1200px) {
    height: 270px;
  }
  
  @media (max-width: 900px) {
    height: 300px;
  }
  
  @media (max-width: 768px) {
    border-radius: 16px;
  }
  
  @media (max-width: 480px) {
    height: 220px;
    border-radius: 14px;
  }
`;

const SmallCardsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: 1200px) {
    gap: 14px;
  }
  
  @media (max-width: 900px) {
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const SmallCard = styled.article`
  display: grid;
  grid-template-columns: 242px 1fr;
  gap: 16px;
  background: white;
  border-radius: 20px;
  padding: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  
  @media (hover: hover) {
    &:hover {
      transform: translateX(4px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    }
  }
  
  &:active {
    opacity: 0.9;
    transform: scale(0.98);
  }
  
  @media (max-width: 1200px) {
    grid-template-columns: 220px 1fr;
    gap: 14px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 180px 1fr;
    gap: 12px;
    padding: 14px;
    border-radius: 16px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 16px;
    border-radius: 14px;
    align-items: flex-start;
  }
`;

const SmallImage = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  @media (hover: hover) {
    ${SmallCard}:hover & img {
      transform: scale(1.05);
    }
  }
  
  @media (max-width: 768px) {
    height: 130px;
    border-radius: 10px;
  }
  
  @media (max-width: 480px) {
    height: 180px;
    border-radius: 8px;
  }
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 8px 18px;
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  box-shadow: 0 4px 12px rgba(255, 20, 147, 0.3);
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 6px 14px;
    font-size: 11px;
    top: 10px;
    right: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 5px 12px;
    font-size: 10px;
    top: 8px;
    right: 8px;
    border-radius: 16px;
  }
`;

const FeaturedContentCard = styled.div`
  background: transparent;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
    gap: 12px;
  }
`;

const SmallCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AuthorAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #E5E7EB;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;

const AuthorName = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const BlogTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #1F2937;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 1.3;
  }
  
  @media (max-width: 480px) {
    font-size: 17px;
    -webkit-line-clamp: 3;
  }
`;

const SmallCardTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 16px;
    -webkit-line-clamp: 2;
    line-height: 1.3;
  }
  
  @media (max-width: 480px) {
    font-size: 15px;
    -webkit-line-clamp: 3;
  }
`;

const BlogMeta = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #9CA3AF;
  margin: 0;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    white-space: normal;
  }
`;

const Resources = () => {
  const dispatch = useDispatch();
  const { sectionContent, blogs: strapiBlogs, loading, error } = useSelector((state) => state.resources);

  useEffect(() => {
    dispatch(fetchResourcesSection());
    dispatch(fetchBlogs(4)); // Fetch 4 blogs (1 featured + 3 small)
  }, [dispatch]);

  // Fallback data
  const fallbackBlogs = [
    {
      id: 1,
      title: 'Atezolizumab Plus Chemotherapy Improves Survival in Advanced-Stage Small-Cell Lung Cancer: Insights from the IMpower133 Study',
      author: { name: 'Author name goes here', avatar: null },
      publishedAt: 'May 27, 2024',
      readTime: '7 min read',
      category: 'Research',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
      featured: true
    },
    {
      id: 2,
      title: 'Darolutamide is approved by the USFDA for metastatic castration-sensitive prostate cancer',
      author: { name: 'Author name goes here', avatar: null },
      publishedAt: 'May 27, 2024',
      readTime: '7 min read',
      category: 'Research',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400'
    },
    {
      id: 3,
      title: 'Taletrectinib is approved by the USFDA for ROS1-positive non-small cell lung cancer',
      author: { name: 'Author name goes here', avatar: null },
      publishedAt: 'May 27, 2024',
      readTime: '7 min read',
      category: 'Research',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400'
    },
    {
      id: 4,
      title: 'Neoadjuvant and adjuvant pembrolizumab is approved by the USFDA for resectable locally adv...',
      author: { name: 'Author name goes here', avatar: null },
      publishedAt: 'May 27, 2024',
      readTime: '7 min read',
      category: 'Research',
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400'
    }
  ];

  const fallbackSection = {
    label: 'RESOURCES',
    title: 'Explore the Latest Insights in Cancer Research',
    viewAllButtonText: 'View all Insights',
    viewAllButtonUrl: '/blog'
  };

  // Use Strapi data or fallback
  const section = sectionContent || fallbackSection;
  const blogs = Array.isArray(strapiBlogs) && strapiBlogs.length > 0 ? strapiBlogs : fallbackBlogs;
  const [featuredBlog, ...smallBlogs] = blogs;

  return (
    <Section id="resources">
      <Container>
        <HeaderSection>
          <HeaderContent>
            <Label>{section.label}</Label>
            <Title>{section.title}</Title>
          </HeaderContent>
          <ViewAllButton href={section.viewAllButtonUrl || '/blog'}>
            {section.viewAllButtonText}
          </ViewAllButton>
        </HeaderSection>
        
        <BlogsGrid>
          {/* Featured Large Card */}
          {featuredBlog && (
            <FeaturedCard>
              <FeaturedImage>
                <img 
                  src={featuredBlog.image ? getMediaUrl(featuredBlog.image) : featuredBlog.image} 
                  alt={featuredBlog.title} 
                />
                {featuredBlog.category && <CategoryBadge>{featuredBlog.category}</CategoryBadge>}
              </FeaturedImage>
              
              <FeaturedContentCard>
                <AuthorInfo>
                  <AuthorAvatar>
                    <img 
                      src={
                        featuredBlog.author?.avatar 
                          ? getMediaUrl(featuredBlog.author.avatar)
                          : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                      } 
                      alt={featuredBlog.author?.name || 'Author'} 
                    />
                  </AuthorAvatar>
                  <AuthorName>{featuredBlog.author?.name || featuredBlog.author}</AuthorName>
                </AuthorInfo>
                
                <BlogTitle>{featuredBlog.title}</BlogTitle>
                
                <BlogMeta>
                  {featuredBlog.publishedAt || featuredBlog.date} 
                  {featuredBlog.readTime && ` | ${featuredBlog.readTime}`}
                </BlogMeta>
              </FeaturedContentCard>
            </FeaturedCard>
          )}
          
          {/* Small Cards Column */}
          <SmallCardsColumn>
            {smallBlogs.map((blog) => (
              <SmallCard key={blog.id}>
                <SmallImage>
                  <img 
                    src={blog.image ? getMediaUrl(blog.image) : blog.image} 
                    alt={blog.title} 
                  />
                  {blog.category && <CategoryBadge>{blog.category}</CategoryBadge>}
                </SmallImage>
                
                <SmallCardContent>
                  <AuthorInfo>
                    <AuthorAvatar>
                      <img 
                        src={
                          blog.author?.avatar 
                            ? getMediaUrl(blog.author.avatar)
                            : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                        } 
                        alt={blog.author?.name || 'Author'} 
                      />
                    </AuthorAvatar>
                    <AuthorName>{blog.author?.name || blog.author}</AuthorName>
                  </AuthorInfo>
                  
                  <SmallCardTitle>{blog.title}</SmallCardTitle>
                  
                  <BlogMeta>
                    {blog.publishedAt || blog.date}
                    {blog.readTime && ` | ${blog.readTime}`}
                  </BlogMeta>
                </SmallCardContent>
              </SmallCard>
            ))}
          </SmallCardsColumn>
        </BlogsGrid>
      </Container>
    </Section>
  );
};

export default Resources;

