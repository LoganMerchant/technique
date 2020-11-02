async function addComment(event) {
    event.preventDefault();

    const comment = document.querySelector('#comment-text').value.trim();
    const post_id = document.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
            comment_text: comment,
            post_id: post_id
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    };
};

document.querySelector('#comment-form').addEventListener('submit', addComment);