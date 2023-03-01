import { LikeFilled, StarOutlined, UserOutlined } from '@ant-design/icons'
import {
  Affix,
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorBoundaryOnFetch from '../../components/ErrorBoundaryOnFetch'
import HeadTitle from '../../components/HeadTitle'
import IconText from '../../components/IconText'
import { PostModelType } from '../../models/post'
import { fetchPostById } from '../../services/post'
import classes from './index.module.less'

const { Title, Text, Paragraph } = Typography
const PostDetail: FC = () => {
  // 帖子ID
  const { id } = useParams<{ id: string }>()
  // 帖子详情
  const [postDetail, setPostDetail] = useState<PostModelType | null>(null)
  // 获取帖子详情中
  const [loading, setLoading] = useState<boolean>(true)
  // 获取帖子详情时出现的错误
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  // 按钮加载中
  const LoadingButton: FC<PropsWithChildren> = ({ children }) => {
    return (
      <Skeleton
        active
        loading={loading}
        avatar={{
          size: 'large',
          style: { marginInlineEnd: -16 },
        }}
        title={false}
        paragraph={false}
      >
        {children}
      </Skeleton>
    )
  }

  // 匹配到路由，当有id参数时执行钩子
  useEffect(() => {
    if (id) {
      fetchPostById(id)
        .then(({ data }) => setPostDetail(data))
        .catch(err => setErrorMsg(err.message))
        .finally(() => setLoading(false))
    }
  }, [id])
  return (
    <>
      <HeadTitle prefix={postDetail?.title ? postDetail.title : '帖子详情'} />
      {loading || postDetail ? (
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Card>
              <Skeleton
                active
                loading={loading}
                title={{ className: classes.titleLoading }}
                paragraph={false}
              >
                <Title level={3}>{postDetail?.title}</Title>
              </Skeleton>
              <Divider />
              <Skeleton active loading={loading} paragraph={{ rows: 8 }}>
                <Paragraph>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: postDetail?.html || '',
                    }}
                  />
                </Paragraph>
              </Skeleton>
              <Divider />
              <div className={classes.action}>
                <Space size="large">
                  <LoadingButton>
                    <IconText
                      icon={
                        <Button
                          shape="circle"
                          size="large"
                          type="primary"
                          icon={<LikeFilled />}
                        />
                      }
                      text={<Text type="secondary">25368</Text>}
                    />
                  </LoadingButton>
                  <LoadingButton>
                    <IconText
                      icon={
                        <Button
                          shape="circle"
                          size="large"
                          icon={<StarOutlined />}
                        />
                      }
                      text={<Text type="secondary">441</Text>}
                    />
                  </LoadingButton>
                </Space>
                {loading ? (
                  <Skeleton.Button />
                ) : (
                  <Button type="link" danger>
                    举报
                  </Button>
                )}
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <Affix offsetTop={16}>
                  <Card>
                    <Row
                      justify="space-between"
                      align="middle"
                      gutter={[0, 16]}
                    >
                      <Col span={24}>
                        <Space className={classes.user}>
                          {loading ? (
                            <Skeleton.Avatar active size="large" />
                          ) : (
                            <Avatar
                              size="large"
                              icon={<UserOutlined />}
                              draggable={false}
                            />
                          )}
                          <Skeleton
                            active
                            loading={loading}
                            paragraph={false}
                            title={{ className: classes.usernameLoading }}
                          >
                            <Paragraph
                              title={postDetail?.user.username}
                              style={{ marginBlockEnd: 0 }}
                              ellipsis={{ rows: 1 }}
                            >
                              {postDetail?.user.username}
                            </Paragraph>
                          </Skeleton>
                        </Space>
                      </Col>
                      <Col span={24}>
                        <Skeleton
                          active
                          loading={loading}
                          title={false}
                          paragraph={{ rows: 3, style: { marginBlockEnd: 0 } }}
                        >
                          <Paragraph
                            type="secondary"
                            title={postDetail?.user.bio}
                            style={{ marginBlockEnd: 0 }}
                            ellipsis={{ rows: 3 }}
                          >
                            {postDetail?.user.bio}
                          </Paragraph>
                        </Skeleton>
                      </Col>
                    </Row>
                  </Card>
                </Affix>
              </Col>
            </Row>
          </Col>
          <Col span={18}>
            <Card title="评论">
              <Skeleton active></Skeleton>
            </Card>
          </Col>
        </Row>
      ) : (
        <ErrorBoundaryOnFetch errorMsg={errorMsg} />
      )}
    </>
  )
}

export default PostDetail
