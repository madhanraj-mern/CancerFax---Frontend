import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getMediaUrl } from '../../services/api';
import { getSectionData, formatMedia } from '../../utils/strapiHelpers';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';


const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 60px;
  gap: 40px;
  
  @media (max-width: 991px) {
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
  color: #6B7280;
`;

const Title = styled.h3`
  color: #36454F;
`;

const ViewAllButton = styled.button`
`;

const BlogsGrid = styled.div`
  display: grid;
  grid-template-columns: 523px 1fr;
  gap: 38px;
  width: 100%;
  
  /* Dynamic: Works with any number of items, preserves all styles */
  grid-auto-rows: min-content;
  align-items: start;
  
  @media (max-width: 1200px) {
    grid-template-columns: 420px 1fr;
    gap: 24px;
  }
  
  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FeaturedCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 42px;
  transition: all 0.3s ease;
  cursor: pointer;
  height: fit-content;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  
  @media (max-width: 768px) {
    gap: 32px;
  }
  
  @media (max-width: 480px) {
    gap: 24px;
  }
`;

const FeaturedImage = styled.div`
  width: 100%;
  height: 328px;
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
`;

const SmallCardsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  
  /* Dynamic: Scrollable if many items, preserves all styles */
  max-height: ${props => props.$hasManyItems ? '800px' : 'auto'};
  overflow-y: ${props => props.$hasManyItems ? 'auto' : 'visible'};
  
  /* Preserve scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    
    &:hover {
      background: #555;
    }
  }
  
  @media (max-width: 991px) {
    gap: 24px;
  }
  
  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const SmallCard = styled.article`
  display: grid;
  grid-template-columns: 272px 1fr;
  gap: 28px;
  border-radius: 20px;
  padding: 0;
  transition: all 0.3s ease;
  cursor: pointer;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  
  @media (max-width: 1200px) {
    grid-template-columns: 222px 1fr;
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 180px 1fr;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
    align-items: flex-start;
  }
`;

const SmallImage = styled.div`
  width: 100%;
  height: 164px;
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
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 10px;
  background: #36454F;
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  z-index: 2;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &.lg-badge {
    font-size: 16px;
    height: 28px;
    padding: 4px 14px;
    line-height: 16px;
  }
  
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
  gap: 30px;
  
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const SmallCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  
  @media (max-width: 768px) {
    gap: 14px;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AuthorAvatar = styled.div`
  width: 24px;
  height: 24px;
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
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #36454F;
  margin: 0;
`;

const BlogTitle = styled.h5`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 24px;
  font-weight: 400;
  color: #1E1928;
  line-height: 35px;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 1.3;
  }
`;

const SmallCardTitle = styled.h3`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #1E1928;
  line-height: 29px;
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

`;

const BlogMeta = styled.p`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #8C8282;
  margin: 0;
  white-space: nowrap;
`;

const Resources = ({ componentData, pageData }) => {

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Get data from global Strapi API (no need for separate fetches)
  const globalData = useSelector(state => state.global?.data);
  // Legacy Redux state (kept for fallback, but not actively used)
  const { sectionContent, blogs: strapiBlogs } = useSelector((state) => state.resources);
  
  // Priority: Use componentData prop (for dynamic pages) > globalData (for home page)
  const resourcesSection = componentData || getSectionData(globalData, 'resources');
  const strapiResources = resourcesSection?.resources || [];
  const globalLoading = useSelector(state => state.global?.loading);

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

  // Map Strapi data: heading -> label, subheading -> title
  const section = resourcesSection ? {
    label: resourcesSection.heading || fallbackSection.label,
    title: resourcesSection.subheading || fallbackSection.title,
    viewAllButtonText: resourcesSection.cta?.text || fallbackSection.viewAllButtonText,
    viewAllButtonUrl: resourcesSection.cta?.URL || fallbackSection.viewAllButtonUrl,
  } : (sectionContent || fallbackSection);
  
  // Format resources/blogs from Strapi - handle multiple field name variations
  const formattedStrapiResources = strapiResources.length > 0
    ? strapiResources.map((resource, index) => {
        const resourceData = resource?.attributes || resource;
        
        // Extract title from multiple possible fields
        const title = resourceData?.title 
          || resourceData?.heading 
          || resourceData?.name 
          || resourceData?.headline
          || '';
        
        // Extract author name from multiple possible fields
        const authorName = resourceData?.author?.firstName 
          || resourceData?.author?.name 
          || resourceData?.author?.fullName
          || resourceData?.authorName
          || resourceData?.author
          || 'Author name goes here';
        
        // Extract author avatar
        const authorAvatar = resourceData?.author?.avatar 
          ? formatMedia(resourceData.author.avatar) 
          : (resourceData?.authorAvatar ? formatMedia(resourceData.authorAvatar) : null);
        
        // Extract image from multiple possible fields
        const imageUrl = formatMedia(resourceData?.image) 
          || formatMedia(resourceData?.featuredImage)
          || formatMedia(resourceData?.coverImage)
          || formatMedia(resourceData?.thumbnail)
          || '';
        
        // Extract category
        const category = resourceData?.category 
          || resourceData?.tag 
          || resourceData?.type
          || 'Research';
        
        // Extract published date
        const publishedDate = resourceData?.publishedAt 
          || resourceData?.published_at
          || resourceData?.date
          || resourceData?.createdAt;
        
        // Format published date
        const publishedAt = publishedDate 
          ? new Date(publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
          : 'May 27, 2024';
        
        // Extract read time
        const readTime = resourceData?.readTime 
          || resourceData?.read_time
          || resourceData?.readingTime
          || '7';
        
        return {
          id: resource?.id || index + 1,
          title: title,
          author: { 
            name: authorName,
            avatar: authorAvatar
          },
          publishedAt: publishedAt,
          readTime: `${readTime} min read`,
          category: category,
          image: imageUrl || fallbackBlogs[index]?.image || '',
          featured: index === 0, // First one is featured
        };
      }).filter(resource => resource.title && resource.title.trim() !== '') // Only filter out truly empty titles
    : [];
  
  // Use Strapi resources if available, otherwise use fallback
  // If Strapi has items, use them. If Strapi has fewer items, fill remaining with fallback
  // This ensures we always show at least the fallback data when Strapi is empty or has few items
  let blogs = [];
  
  if (formattedStrapiResources.length > 0) {
    // Use Strapi resources
    blogs = [...formattedStrapiResources];
    // If we have less than 4 total (1 featured + 3 small), add fallback items to fill
    if (blogs.length < 4) {
      blogs = [...blogs, ...fallbackBlogs.slice(blogs.length, 4)];
    }
  } else if (Array.isArray(strapiBlogs) && strapiBlogs.length > 0) {
    // Use legacy Strapi blogs
    blogs = [...strapiBlogs];
    if (blogs.length < 4) {
      blogs = [...blogs, ...fallbackBlogs.slice(blogs.length, 4)];
    }
  } else {
    // Use all fallback blogs when no Strapi data
    blogs = fallbackBlogs;
  }
  
  // Destructure: first blog is featured, rest are small cards
  // Ensure blogs array is never empty - always use fallback if needed
  const safeBlogs = blogs.length > 0 ? blogs : fallbackBlogs;
  const [featuredBlog, ...smallBlogs] = safeBlogs;
  
  // Final safety check: ensure we always have small blogs (minimum 3)
  // Always ensure we have at least 3 small cards for the right column
  let finalSmallBlogs = smallBlogs;
  
  // If we don't have enough small blogs, fill from fallbackBlogs
  if (finalSmallBlogs.length < 3) {
    const startIndex = safeBlogs.length; // Start from where safeBlogs ended
    const neededCount = 3 - finalSmallBlogs.length; // How many more we need
    const remainingFromFallback = fallbackBlogs.slice(startIndex, startIndex + neededCount);
    finalSmallBlogs = [...finalSmallBlogs, ...remainingFromFallback];
  }
  
  // Absolute fallback: if still empty, use all fallback blogs except first one
  if (finalSmallBlogs.length === 0) {
    finalSmallBlogs = fallbackBlogs.slice(1);
  }
  
  // Debug logging after data processing
  useEffect(() => {
    if (globalData && !globalLoading) {
      console.log('Resources: Complete data extraction', {
        hasDynamicZone: !!globalData.dynamicZone,
        resourcesSection: !!resourcesSection,
        resourcesSectionKeys: resourcesSection ? Object.keys(resourcesSection) : null,
        strapiResourcesCount: strapiResources.length,
        strapiResourcesRaw: strapiResources.slice(0, 2), // Show first 2 for debugging
        formattedStrapiResourcesCount: formattedStrapiResources.length,
        finalBlogsCount: blogs.length,
        hasFeaturedBlog: !!featuredBlog,
        featuredBlogTitle: featuredBlog?.title,
        featuredBlogAuthor: featuredBlog?.author?.name,
        smallBlogsCount: smallBlogs.length,
        finalSmallBlogsCount: finalSmallBlogs.length,
        smallBlogsTitles: smallBlogs.map(b => b.title),
        finalSmallBlogsTitles: finalSmallBlogs.map(b => b.title),
        blogsSource: formattedStrapiResources.length > 0 ? 'strapi' : (Array.isArray(strapiBlogs) && strapiBlogs.length > 0 ? 'legacy-strapi' : 'fallback')
      });
    }
  }, [globalData, globalLoading, resourcesSection, strapiResources, formattedStrapiResources, blogs, featuredBlog, smallBlogs, finalSmallBlogs, strapiBlogs]);

  return (
    <section className='resources_sec py-120' id="resources">
      <div className='containerWrapper'>
      <ScrollAnimationComponent animationVariants={fadeIn}>
        <HeaderSection className='commContent_wrap'>
          <HeaderContent>
            <Label className='contentLabel'>{section.label}</Label>
            <Title className='title-3'>{section.title}</Title>
          </HeaderContent>
          <ViewAllButton className='btn btn-pink-solid mb-lg-4' href={section.viewAllButtonUrl || '/blog'}>
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
                {featuredBlog.category && <CategoryBadge className='lg-badge'>{featuredBlog.category}</CategoryBadge>}
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
          
          {/* Small Cards Column - Fully Dynamic: Renders ALL items from Strapi */}
          <SmallCardsColumn $hasManyItems={finalSmallBlogs.length > 5}>
            {finalSmallBlogs && finalSmallBlogs.length > 0 ? finalSmallBlogs.map((blog) => (
              <ScrollAnimationComponent animationVariants={fadeIn}>
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
              </ScrollAnimationComponent>
            )) : null}
          </SmallCardsColumn>
        </BlogsGrid>
        </ScrollAnimationComponent>
      </div>
    </section>
  );
};

export default Resources;

