import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Card, Input, MultiSelect } from '@/shared/components';
import { CRUX_METRICS_MAPPER } from '@/shared/constants';

const PageSpeed = () => {
    const [link, setLink] = useState('');
    const [linkCruxData, setLinkCruxData] = useState<any>(null);
    const [cruxFilteredData, setCruxFilteredData] = useState<any>(null);
    const [selectedMetrics, setSelectedMetrics] = useState<any>([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (!selectedMetrics?.length) {
            setCruxFilteredData(linkCruxData);
            return;
        }

        const filteredData = Object.keys(linkCruxData).reduce(
            (acc: any, key) => {
                const val = CRUX_METRICS_MAPPER[key];
                if (selectedMetrics?.indexOf(val) !== -1) {
                    acc = {
                        ...acc,
                        [key]: linkCruxData[key],
                    };
                }

                return acc;
            },
            {}
        );

        setCruxFilteredData(filteredData);
    }, [selectedMetrics, selectedMetrics?.length, linkCruxData]);

    const onFetchCruxData = async () => {
        if (!link) return;

        try {
            setLoader(true);
            const response = await axios.post(
                `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY}`,
                {
                    origin: link,
                    metrics: [
                        'largest_contentful_paint',
                        'cumulative_layout_shift',
                        'experimental_time_to_first_byte',
                        'first_contentful_paint',
                        'first_input_delay',
                        'interaction_to_next_paint',
                    ],
                }
            );
            setLoader(false);

            setLinkCruxData(response?.data?.record?.metrics);
        } catch (err: any) {
            console.log(err?.message);
            setLoader(false);
        }
    };

    return (
        <>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="w-full mb-10">
                <div>
                    <h1 className="text-4xl text-center font-semibold">
                        Analyze Page Speed
                    </h1>
                </div>

                <div className="w-full flex mt-12 justify-between px-16 gap-12">
                    <div className="w-1/5 flex items-center justify-end">
                        <h3 className="text-2xl font-semibold">URL:</h3>
                    </div>
                    <div className="w-3/5">
                        <Input
                            value={link}
                            setValue={setLink}
                            label="Enter your URL"
                        />
                    </div>
                    <div className="flex w-1/5 items-center">
                        <Button
                            text="Search"
                            disabled={!link}
                            onClick={onFetchCruxData}
                        />
                    </div>
                </div>

                {cruxFilteredData ? (
                    <>
                        <div className="mt-12 px-24 flex">
                            <div className="w-2/3 bg-slate-600 py-2 rounded-lg flex items-center justify-center">
                                <h2 className="text-2xl text-white font-semibold text-center">
                                    CRUX Data
                                </h2>
                            </div>
                            <div className="w-1/3 flex justify-center">
                                <MultiSelect
                                    label="Metrics"
                                    value={selectedMetrics}
                                    setValue={setSelectedMetrics}
                                    options={Object.values(CRUX_METRICS_MAPPER)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-y-8 justify-center mt-12 px-32 flex-wrap cards-wrapper">
                            {Object.keys(cruxFilteredData).map((metric) => (
                                <Card
                                    key={metric}
                                    className="mx-12"
                                    data={{
                                        key: metric,
                                        data: cruxFilteredData[metric],
                                    }}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="mt-24 px-24">
                        <p>
                            Page speed is a critical factor in web development,
                            directly impacting user experience, search engine
                            rankings, and conversion rates. Fast-loading pages
                            ensure that users can access content quickly,
                            reducing bounce rates and increasing engagement.
                            Various factors influence page speed, including
                            server performance, file sizes, image optimization,
                            and the efficiency of code. Utilizing techniques
                            like minifying CSS and JavaScript, leveraging
                            browser caching, and using Content Delivery Networks
                            (CDNs) can significantly improve load times. Modern
                            web development practices, such as lazy loading
                            images and implementing responsive design, also
                            contribute to faster page loads. Additionally, tools
                            like Google PageSpeed Insights and GTmetrix provide
                            valuable insights and recommendations for optimizing
                            page speed. It's essential to regularly monitor and
                            optimize page speed as it directly affects SEO
                            rankings; search engines prioritize fast-loading
                            sites, resulting in higher visibility and more
                            traffic. In today's fast-paced digital world, users
                            expect instant access to information, and even a
                            delay of a few seconds can lead to a loss of
                            potential customers. Therefore, prioritizing page
                            speed is not just about enhancing user experience
                            but also about staying competitive in the market and
                            ensuring the long-term success of a website.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default PageSpeed;
