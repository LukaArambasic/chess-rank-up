package hr.fer.tzk.rankup.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "mysection", uniqueConstraints = @UniqueConstraint(columnNames = "namesection"))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idsection")
    private Long id;

    @Column(name = "namesection", nullable = false)
    private String name;

    @Column(name = "descriptionsection", length = 500)
    private String description;

    @Column(name = "logo")
    private String logo;

    @Column(name = "isopen")
    private boolean open = true;
}
