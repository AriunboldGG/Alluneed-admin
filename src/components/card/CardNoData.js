import EmptyContent from 'src/components/empty-content';

export default function CardNoData() {
    return (
        <div>
            <EmptyContent
                title="Өгөгдөл байхгүй"
                sx={{
                    '& span.MuiBox-root': { height: 160 },
                    p: 20,
                }}
            />
        </div>
    );
}
