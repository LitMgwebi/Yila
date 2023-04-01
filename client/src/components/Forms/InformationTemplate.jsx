function InformationTemplate({payloads, Card}){
    return(
        <div className="information">
            {payloads ? payloads.map((payload, i) => {
                return(
                    <Card payload={payload} key={i} />
                );
            })
            : <div className="information">Whole lot of nothing</div>}
        </div>
    )
}

export default InformationTemplate