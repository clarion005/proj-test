CREATE TABLE tables (
  tableID INT PRIMARY KEY AUTO_INCREMENT,
  capacity INT NOT NULL

  sectionID INT NOT NULL,
  FOREIGN KEY (sectionID) REFERENCES sections(sectionID)
);