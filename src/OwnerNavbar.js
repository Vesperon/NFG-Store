const OwnerNavbar = () => {
    return ( 
    <div>
        <Container fluid style={{backgroundColor:"black"}}>
        <h1 className="header p-3" >Palit na aron makabarato ka! 30% off on selected items!</h1>
        </Container>
        <Navbar fluid className='navcon' >
            <Container >
                <Navbar.Brand href="/home" className="brandLabel">OWNER</Navbar.Brand>
                <Nav className="mx-auto ">
                    <Nav.Link href="/home" className="mx-2 "  >Home</Nav.Link>
                    <Nav.Link href="/inventory" className="mx-2">Inventory</Nav.Link>
                    <Nav.Link href="/order" className="mx-2">Orders</Nav.Link>
                    <Nav.Link href="/history" className="mx-2">History</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <br></br>
    </div> );
}
 
export default OwnerNavbar;