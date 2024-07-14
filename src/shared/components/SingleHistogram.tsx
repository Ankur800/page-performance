import React, { useState } from 'react';

type SingleHistogramProps = {
    data: Record<any, any>[];
};

const SingleHistogram = ({ data }: SingleHistogramProps) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const renderPercentage = (index: number) => {
        if (data[index]?.density > 0.2) {
            return (
                <p className="text-white text-xs">
                    {(data[index]?.density * 100).toFixed(2)}%
                </p>
            );
        }
        return null;
    };

    const getWidth = (index: number) => {
        return { width: `${data[index]?.density * 100}%` };
    };

    return (
        <div>
            <div className="flex flex-row w-full h-8 items-center">
                <div
                    onMouseEnter={() => setHoverIndex(0)}
                    onMouseLeave={() => setHoverIndex(null)}
                    style={getWidth(0)}
                    className={`bg-success transition-all duration-300 flex items-center justify-center rounded-l-xl ${
                        hoverIndex === 0 ? 'h-7' : 'h-6'
                    }`}
                >
                    {renderPercentage(0)}
                </div>
                <div
                    onMouseEnter={() => setHoverIndex(1)}
                    onMouseLeave={() => setHoverIndex(null)}
                    style={getWidth(1)}
                    className={`bg-warning transition-all duration-300 flex items-center justify-center ${
                        hoverIndex === 1 ? 'h-7' : 'h-6'
                    }`}
                >
                    {renderPercentage(1)}
                </div>
                <div
                    onMouseEnter={() => setHoverIndex(2)}
                    onMouseLeave={() => setHoverIndex(null)}
                    style={getWidth(2)}
                    className={`bg-error transition-all duration-300 flex h-6 items-center justify-center rounded-r-xl ${
                        hoverIndex === 2 ? 'h-7' : 'h-6'
                    }`}
                >
                    {renderPercentage(2)}
                </div>
            </div>

            {hoverIndex !== null ? (
                <div className="flex mt-2 items-center justify-center">
                    <div
                        className={`h-3 w-3 rounded-full mr-2 ${
                            hoverIndex === 0
                                ? 'bg-success'
                                : hoverIndex === 1
                                ? 'bg-warning'
                                : 'bg-error'
                        }`}
                    />
                    <p className="text-xs font-extralight mr-2">
                        {data[hoverIndex]?.start}
                        {data[hoverIndex]?.end
                            ? ` - ${data[hoverIndex]?.end}`
                            : ' and Above'}
                    </p>
                    <p
                        className={`text-xs font-semibold ${
                            hoverIndex === 0
                                ? 'text-success'
                                : hoverIndex === 1
                                ? 'text-warning'
                                : 'text-error'
                        }`}
                    >
                        {(data[hoverIndex]?.density * 100).toFixed(2)}%
                    </p>
                </div>
            ) : null}
        </div>
    );
};

export default SingleHistogram;
