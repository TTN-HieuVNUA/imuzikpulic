import { Box, Flex } from 'rebass';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHotKeywordsQuery } from '../queries';

import Icon from './Icon';
import { Input } from '@rebass/forms';
import { useTheme } from 'emotion-theming';
import { Theme } from '../themes';
import { useHistory } from 'react-router-dom';
import { Separator } from './Separator';

export const SearchBox = (props: {
  autoFocus?: boolean;
  value?: string;
  onClickOutside?: (value: boolean) => void;
}) => {
  const history = useHistory();
  const theme = useTheme<Theme>();
  const ref = useRef<HTMLDivElement>(null);
  const [queryInput, setQueryInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const { data: hotKeywordData } = useHotKeywordsQuery();
  const searchHistory: { history: Array<string> } = JSON.parse(
    localStorage.getItem('history') || '{"history": []}'
  );

  const addHistory = (value: string) => {
    searchHistory.history.unshift(value);
    localStorage.setItem('history', JSON.stringify(searchHistory));
    closeResult();
  };

  const closeResult = useCallback(() => {
    showResult && setShowResult(false);
  }, [showResult]);
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      if (props.onClickOutside) {
        props.onClickOutside(false);
      } else {
        closeResult();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });
  useEffect(() => {
    if (props.value) {
      setQueryInput(props.value);
    }
  }, [props.value]);
  return (
    <Flex
      ref={ref}
      my="17px"
      px="13px"
      css={{
        position: 'relative',
        alignItems: 'center',
        width: '100%',
        maxWidth: '488px',
        marginLeft: 'auto',
        borderRadius: '60px',
        backgroundColor: '#5A5A5A',
        backgroundBlendMode: 'multiply',
        height: '40px',
      }}>
      <Icon size={24} name="search" color="white" />
      <Input
        autoFocus={props.autoFocus}
        px="13px"
        placeholder="Nhập nội dung tìm kiếm"
        css={{
          border: 'none',
          ':focus': {
            outline: 'none',
          },
          '::placeholder': {
            fontStyle: 'italic',
            color: 'rgba(255, 255, 255, 0.87)',
            fontSize: theme.fontSizes[2],
            lineHeight: '17px',
          },
        }}
        value={queryInput}
        onChange={(e) => {
          setQueryInput(e.target.value);
          !showResult && setShowResult(true);
        }}
        onFocus={() => {
          !showResult && setShowResult(true);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && queryInput !== '') {
            addHistory(queryInput);
            e.currentTarget.blur();
            history.push(`/tim-kiem?q=${queryInput}`);
          }
        }}
      />
      {showResult && (
        <Box
          px="21px"
          py="18px"
          css={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '48px',
            backgroundColor: '#262523',
            borderRadius: '5px',
          }}>
          {searchHistory.history.length !== 0 && (
            <>
              {searchHistory.history.slice(0, 5).map((keyword, idx) => (
                <Flex
                  key={idx}
                  alignItems="center"
                  mb="10px"
                  css={{
                    cursor: 'pointer',
                    ':last-child': {
                      marginBottom: 0,
                    },
                    ':hover *': {
                      color: theme.colors.primary,
                      path: {
                        fill: theme.colors.primary,
                      },
                    },
                  }}
                  onClick={() => {
                    addHistory(keyword);
                    history.push(`/tim-kiem?q=${keyword}`);
                  }}>
                  <Icon size={20} name="history" color="lightText" />
                  <Box
                    ml="10px"
                    css={{
                      fontSize: theme.fontSizes[2],
                      fontWeight: 400,
                      lineHeight: '17px',
                      color: 'rgba(255, 255, 255, 0.87)',
                    }}>
                    {keyword}
                  </Box>
                </Flex>
              ))}
              <Separator my={16} />
            </>
          )}
          {(hotKeywordData?.hotKeywords ?? []).map((keyword) => (
            <Flex
              key={keyword}
              alignItems="center"
              mb="10px"
              css={{
                cursor: 'pointer',
                ':last-child': {
                  marginBottom: 0,
                },
                ':hover *': {
                  color: theme.colors.primary,
                  path: {
                    fill: theme.colors.primary,
                  },
                },
              }}
              onClick={() => {
                addHistory(keyword);
                history.push(`/tim-kiem?q=${keyword}`);
              }}>
              <Icon size={20} name="trending" color="lightText" />
              <Box
                ml="10px"
                css={{
                  fontSize: theme.fontSizes[2],
                  fontWeight: 400,
                  lineHeight: '17px',
                  color: 'rgba(255, 255, 255, 0.87)',
                }}>
                {keyword}
              </Box>
            </Flex>
          ))}
        </Box>
      )}
    </Flex>
  );
};
