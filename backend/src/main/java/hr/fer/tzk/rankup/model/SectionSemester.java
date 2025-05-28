package hr.fer.tzk.rankup.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sectionsemester",
        uniqueConstraints = {
        @UniqueConstraint(columnNames = {"idmember", "idsemester", "idsection"} )
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SectionSemester {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idsectionsemester")
    private Long id;

    @Column(name = "threshold", nullable = false)
    private int threshold = 13;

    @Column(name = "points", nullable = false)
    private int points = 0;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "idsemester", nullable = false)
    private Semester semester;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idsection", nullable = false)
    private Section section;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idmember", nullable = false)
    private Member member;
}
