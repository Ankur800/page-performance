import React, { useEffect, useState } from 'react';
import { SingleHistogram } from '../components';
import { CRUX_METRICS_MAPPER } from '../constants';

type CardProps = {
    className?: string;
    data: { key: string; data: any };
};

const Card = ({ className, data }: CardProps) => {
    const [resultColor, setResultColor] = useState('text-success');

    useEffect(() => {
        const res = data?.data?.percentiles?.p75;

        if (
            res >= data?.data?.histogram[0]?.start &&
            res < data?.data?.histogram[0]?.end
        ) {
            setResultColor('text-success');
        } else if (
            res >= data?.data?.histogram[1]?.start &&
            res < data?.data?.histogram[1]?.end
        ) {
            setResultColor('text-warning');
        } else {
            setResultColor('text-error');
        }
    }, [data?.data]);

    const formatTimeData = (time: string) => {
        if (+time >= 1000) {
            return `${(+time / 1000).toFixed(2)}s`;
        } else {
            return `${time}ms`;
        }
    };

    return (
        <>
            <div className={`h-56 w-72 card rounded-md p-8 ${className}`}>
                <h5 className="text-center h-16 text-lg font-semibold text-secondary">
                    {CRUX_METRICS_MAPPER[data?.key]}
                </h5>
                <p
                    className={`text-center text-4xl font-semibold ${resultColor}`}
                >
                    {data?.key === 'cumulative_layout_shift'
                        ? data?.data?.percentiles?.p75
                        : formatTimeData(data?.data?.percentiles?.p75)}
                </p>
                <div className="mt-4">
                    <SingleHistogram data={data?.data?.histogram} />
                </div>
            </div>
            <style jsx>{`
                .card {
                    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
                }
            `}</style>
        </>
    );
};

export default Card;
