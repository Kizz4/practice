

@RestController
@RequestMapping("/flashcards")
public class FlashcardController {

    @GetMapping("/{id}")
    public FlashcardResponse getById(@PathVariable Long id) { ... }

    @PostMapping
    public FlashcardResponse create(@RequestBody @Valid FlashcardRequest request) { ... }

}