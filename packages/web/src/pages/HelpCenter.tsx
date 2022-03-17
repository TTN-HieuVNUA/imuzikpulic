import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex } from 'rebass';
import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import { useHelpArticlesQuery, useHelpArticleCategoriesQuery } from '../queries';
import { H3 } from '../components/H3';



export default function HelpCenter() {
    const { slug = '' } = useParams<{ slug: string }>();
    const baseVariables = { slug };
    const { data } = useHelpArticleCategoriesQuery();
    const detail = useHelpArticlesQuery({ variables: baseVariables });
    return (
        <Box>
            <Header.Fixed />
            <Section bg="alternativeBackground" py={9} >
                <Flex mx={-4}>
                    <Box width={1 / 4} px={4} sx={{
                        borderWidth: '0px 1px 0px 0px',
                        borderStyle: 'solid',
                        borderColor: 'gray',

                    }}>
                        <H3>Danh Mục</H3>
                        {(data?.helpArticleCategories ?? []).map((item) => (
                            <Box p={1} key={item.id}>
                                <Link {...{ to: `/huong-dan/${item.slug}` }} style={{ color: item.slug===slug?'yellow':'' }} >
                                    {item.name}
                                </Link>
                            </Box>
                        ))}

                    </Box>
                    <Box width={3 / 4} px={4}>
                        {(detail?.data?.helpArticleCategory?.articles ?? []).map((item,idx) => (
                            <Box p={1} key={item.id}>
                                <h2>{item.title}</h2>
                                <div
                                    style={{ color: '#ffffff' }}
                                    dangerouslySetInnerHTML={{ __html: item.body ?? '' }}
                                />
                            </Box>
                            
                        ))}

                    </Box>
                </Flex>
            </Section>
            <Footer />
        </Box>
    );
}
