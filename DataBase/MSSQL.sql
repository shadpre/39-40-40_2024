-- Create customers table
CREATE TABLE dbo.customers (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    address NVARCHAR(255),
    phone NVARCHAR(50),
    email NVARCHAR(255) UNIQUE
);
GO

-- Create paper table
CREATE TABLE dbo.paper (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL UNIQUE,
    discontinued BIT NOT NULL DEFAULT 0,
    stock INT NOT NULL DEFAULT 0,
    price FLOAT NOT NULL
);
GO

-- Create properties table
CREATE TABLE dbo.properties (
    id INT IDENTITY(1,1) PRIMARY KEY,
    property_name NVARCHAR(255) NOT NULL
);
GO

-- Create orders table
CREATE TABLE dbo.orders (
    id INT IDENTITY(1,1) PRIMARY KEY,
    order_date DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    delivery_date DATE,
    status NVARCHAR(50) NOT NULL DEFAULT 'pending',
    total_amount FLOAT NOT NULL,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES dbo.customers(id) ON DELETE CASCADE
);
GO

-- Create paper_properties table
CREATE TABLE dbo.paper_properties (
    paper_id INT NOT NULL,
    property_id INT NOT NULL,
    PRIMARY KEY (paper_id, property_id),
    FOREIGN KEY (paper_id) REFERENCES dbo.paper(id),
    FOREIGN KEY (property_id) REFERENCES dbo.properties(id)
);
GO

-- Create order_entries table
CREATE TABLE dbo.order_entries (
    id INT IDENTITY(1,1) PRIMARY KEY,
    quantity INT NOT NULL,
    product_id INT,
    order_id INT,
    FOREIGN KEY (order_id) REFERENCES dbo.orders(id),
    FOREIGN KEY (product_id) REFERENCES dbo.paper(id)
);
GO

-- Create indexes
CREATE INDEX IX_order_entries_order_id ON dbo.order_entries (order_id);
GO

CREATE INDEX IX_order_entries_product_id ON dbo.order_entries (product_id);
GO

CREATE INDEX IX_orders_customer_id ON dbo.orders (customer_id);
GO

CREATE INDEX IX_paper_properties_property_id ON dbo.paper_properties (property_id);
GO
